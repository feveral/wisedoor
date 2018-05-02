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
import time
from sklearn.svm import SVC

batch_size = 1000
nrof_images = 1
image_size = 160
model_path = "./../models/20170512-110547.pb"
classifier_path = "./../models/tom_new_classifier.pkl"
image_path = "./image/tom/cut.png"

class Classify:
    def __init__(self):
        with tf.Graph().as_default():
            with tf.Session() as self.sess:

                np.random.seed(seed=666)

                # Load the model
                print('Loading feature extraction model')
                facenet.load_model(model_path)
                
                # Get input and output tensors
                self.images_placeholder = tf.get_default_graph().get_tensor_by_name("input:0")
                self.embeddings = tf.get_default_graph().get_tensor_by_name("embeddings:0")
                self.phase_train_placeholder = tf.get_default_graph().get_tensor_by_name("phase_train:0")
                self.embedding_size = self.embeddings.get_shape()[1]

                # Classify images
                print('Testing classifier')
                classifier_filename_exp = os.path.expanduser(classifier_path)
                with open(classifier_filename_exp, 'rb') as infile:
                    u = pickle._Unpickler(infile)
                    u.encoding = 'latin1'
                    (self.model, self.class_names) = u.load()
                print('Loaded classifier model from file "%s"' % classifier_filename_exp)
        self.classifyImage()

    def classifyImage(self):
        print('Calculating features for images')
        paths = [image_path]
        nrof_images = len(paths)
        nrof_batches_per_epoch = int(math.ceil(1.0*nrof_images / batch_size))
        emb_array = np.zeros((nrof_images, self.embedding_size))
        for i in range(nrof_batches_per_epoch):
            start_index = i*batch_size
            end_index = min((i+1)*batch_size, nrof_images)
            paths_batch = paths[start_index:end_index]
            images = facenet.load_data(paths_batch, False, False, image_size)
            feed_dict = { self.images_placeholder:images, self.phase_train_placeholder:False }
            start_time = time.time()
            emb_array[start_index:end_index,:] = self.sess.run(self.embeddings, feed_dict=feed_dict)
            print(time.time()-start_time)

        predictions = self.model.predict_proba(emb_array)
        best_class_indices = np.argmax(predictions, axis=1)
        best_class_probabilities = predictions[np.arange(len(best_class_indices)), best_class_indices]

        for i in range(len(best_class_indices)):
            print('%4d  %s: %.3f' % (i, self.class_names[best_class_indices[i]], best_class_probabilities[i]))