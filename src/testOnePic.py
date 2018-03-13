from __future__ import absolute_import
from __future__ import division
from __future__ import print_function

import tensorflow as tf
import numpy as np
import argparse
import facenet
import os
import sys
import math
import pickle
from sklearn.svm import SVC
from scipy import misc
import time

batch_size = 1000
nrof_images = 1
image_size = 160
model_path = '../models/20170512-110547.pb'
classifier_path = '../models/my_classifier.pkl' 
image_path = '../image/test_cut/3ddce97addb2d0cb7708338d4c3f8f_cut.png'

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


            # Run forward pass to calculate embeddings
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
                print(time.time()-start_time)

            predictions = model.predict_proba(emb_array)
            best_class_indices = np.argmax(predictions, axis=1)
            best_class_probabilities = predictions[np.arange(len(best_class_indices)), best_class_indices]
            
            for i in range(len(best_class_indices)):
                print('%4d  %s: %.3f' % (i, class_names[best_class_indices[i]], best_class_probabilities[i]))

def load_one_data(image_path,do_random_crop, do_random_flip,size,do_prewhiten=True):
    images = np.zeros((nrof_images, size, size, 3))
    img = misc.imread(image_path)
    if img.ndim == 2:
        img = facenet.to_rgb(img)
    if do_prewhiten:
        img = facenet.prewhiten(img)
    img = facenet.crop(img, do_random_crop, size)
    img = facenet.flip(img, do_random_flip)
    images[0,:,:,:] = img
    return images

if __name__ == '__main__':
    main()
