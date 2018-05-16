from __future__ import absolute_import
from __future__ import division
from __future__ import print_function

import tensorflow as tf
import numpy as np
import argparse
import facenet
import cv2
import os
import sys
import math
import pickle
from sklearn.svm import SVC
from scipy import misc
import time
from utility import *

batch_size = 1000
nrof_images = 1
image_size = 160
model_path = './20170512-110547.pb'
classifier_path = './models/250e5c42ed88732582c61d502602bcd0.pkl' 
image_path = './image/testPic.png'

def main():
    with tf.Graph().as_default():
        with tf.Session() as sess:

            np.random.seed(seed=666)

            # Load the model
            print('Loading feature extraction model')
            facenet.load_model(model_path)
            
            # Get input and output tensors
            images_placeholder = tf.get_default_graph().get_tensor_by_name("input:0")
            embeddings = tf.get_default_graph().get_tensor_by_name("embeddings:0")
            phase_train_placeholder = tf.get_default_graph().get_tensor_by_name("phase_train:0")
            embedding_size = embeddings.get_shape()[1]

            # Classify images
            print('Testing classifier')
            classifier_filename_exp = os.path.expanduser(classifier_path)
            with open(classifier_filename_exp, 'rb') as infile:
                (model, class_names) = pickle.load(infile)
            print('Loaded classifier model from file "%s"' % classifier_filename_exp)

            cap = cv2.VideoCapture(1)
            while(True):
            
                ret, frame = cap.read()
                cv2.imshow('frame',frame)
                if cv2.waitKey(1) & 0xFF == ord('c'):
                    saveImage(image_path,frame)
                    
                    if not align(image_path) :
                       print('Did not find any face')
                       continue
                    
                    print('Calculating features for images')
                    paths = [image_path]
                    nrof_images = len(paths)
                    nrof_batches_per_epoch = int(math.ceil(1.0*nrof_images / batch_size))
                    emb_array = np.zeros((nrof_images, embedding_size))
                    for i in range(nrof_batches_per_epoch):
                        start_index = i*batch_size
                        end_index = min((i+1)*batch_size, nrof_images)
                        paths_batch = paths[start_index:end_index]
                        images = facenet.load_data(paths_batch, False, False, image_size)
                        feed_dict = { images_placeholder:images, phase_train_placeholder:False }
                        start_time = time.time()
                        emb_array[start_index:end_index,:] = sess.run(embeddings, feed_dict=feed_dict)
                        print('it cost',time.time()-start_time,'s')

                    predictions = model.predict_proba(emb_array)
                    best_class_indices = np.argmax(predictions, axis=1)
                    best_class_probabilities = predictions[np.arange(len(best_class_indices)), best_class_indices]
                
                    for i in range(len(best_class_indices)):
                        print('%4d  %s: %.3f' % (i, class_names[best_class_indices[i]], best_class_probabilities[i]))

if __name__ == '__main__':
    main()
