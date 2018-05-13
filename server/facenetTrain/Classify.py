"""An example of how to use your own dataset to train a classifier that recognizes people.
"""
# MIT License
# 
# Copyright (c) 2016 David Sandberg
# 
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
# 
# The above copyright notice and this permission notice shall be included in all
# copies or substantial portions of the Software.
# 
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
# SOFTWARE.

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
import time
model_path  = "./models/20170512-110547.pb"

class Classify:
    def __init__(self):
        self.tensorflow_graph = tf.Graph()
        with self.tensorflow_graph.as_default():
            print('Loading feature extraction model')
            facenet.load_model(model_path)
            
            # Get input and output tensors
            self.images_placeholder = tf.get_default_graph().get_tensor_by_name("input:0")
            self.embeddings = tf.get_default_graph().get_tensor_by_name("embeddings:0")
            self.phase_train_placeholder = tf.get_default_graph().get_tensor_by_name("phase_train:0")
            self.embedding_size =  self.embeddings.get_shape()[1]
                        
    def classify_image(self,input_file_path,classifier_path):
        with tf.Session(graph=self.tensorflow_graph) as sess:
            np.random.seed(seed=666)
            dataset = self.get_dataset(input_file_path)

            # Check that there are at least one training image per class
            for cls in dataset:
                assert(len(cls.image_paths)>0, 'There must be at least one image for each class in the dataset')            

                
            paths, labels = facenet.get_image_paths_and_labels(dataset)
            
            print('Number of classes: %d' % len(dataset))
            print('Number of images: %d' % len(paths))
                        # Run forward pass to calculate embeddings
            print('Calculating features for images')
            nrof_images = len(paths)
            nrof_batches_per_epoch = int(math.ceil(1.0*nrof_images / 90))
            emb_array = np.zeros((nrof_images, self.embedding_size))
            for i in range(nrof_batches_per_epoch):
                start_index = i* 90
                end_index = min((i+1) * 90, nrof_images)
                paths_batch = paths[start_index:end_index]
                images = facenet.load_data(paths_batch, False, False, 160)
                feed_dict = { self.images_placeholder:images, self.phase_train_placeholder:False }
                emb_array[start_index:end_index,:] = sess.run(self.embeddings, feed_dict=feed_dict)
            classifier_filename_exp = os.path.expanduser(classifier_path)
                        # Classify images
            print('Testing classifier')
            with open(classifier_filename_exp, 'rb') as infile:
                (model, class_names) = pickle.load(infile)
            print('Loaded classifier model from file "%s"' % classifier_filename_exp)
            predictions = model.predict_proba(emb_array)
            best_class_indices = np.argmax(predictions, axis=1)
            best_class_probabilities = predictions[np.arange(len(best_class_indices)), best_class_indices]
                        
            for i in range(len(best_class_indices)):
                print('%4d  %s: %.3f' % (i, class_names[best_class_indices[i]], best_class_probabilities[i]))
                
            accuracy = np.mean(np.equal(best_class_indices, labels))
            print('Accuracy: %.3f' % accuracy)

    def get_dataset(self, path, has_class_directories=True):
        dataset = []
        imageList = []
        imageList.append(path)
        class_name = "unknown"
        dataset.append(facenet.ImageClass(class_name,imageList))
        return dataset


classify = Classify()

input_image_path = "./image/3c82fe029115a3efb15980f6d9f2b04c.png"
classifier_path = "./models/tom_strength_classifier.pkl"
test_classifier_path = "./models/test333.pkl"
classify.classify_image(input_image_path,classifier_path)