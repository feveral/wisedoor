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
test_classifier_path = "./test.pkl"

tensorflow_graph = tf.Graph()
sess = tf.Session()
with tensorflow_graph.as_default():
    print('Loading feature extraction model')
    facenet.load_model(model_path)
    
    # Get input and output tensors
    images_placeholder = tf.get_default_graph().get_tensor_by_name("input:0")
    embeddings = tf.get_default_graph().get_tensor_by_name("embeddings:0")
    phase_train_placeholder = tf.get_default_graph().get_tensor_by_name("phase_train:0")
    embedding_size =  embeddings.get_shape()[1]

    print('Testing classifier')
    classifier_filename_exp = os.path.expanduser(test_classifier_path)

    with open(classifier_filename_exp, 'rb') as infile:
        (model, class_names) = pickle.load(infile)
    print('Loaded classifier model from file "%s"' % classifier_filename_exp)
    
with tf.Session(graph=tensorflow_graph) as sess:
    def reload_model():
        print('Testing classifier')
        classifier_filename_exp = os.path.expanduser(test_classifier_path)

        with open(classifier_filename_exp, 'rb') as infile:
            (model, class_names) = pickle.load(infile)
        print('Loaded classifier model from file "%s"' % classifier_filename_exp)
        
    def classify_image(input_file_path):
        np.random.seed(seed=666)
        paths = [input_file_path]

        # Run forward pass to calculate embeddings
        nrof_images = len(paths)
        nrof_batches_per_epoch = int(math.ceil(1.0*nrof_images / 90))
        emb_array = np.zeros((nrof_images, embedding_size))
        for i in range(nrof_batches_per_epoch):
            start_index = i* 90
            end_index = min((i+1) * 90, nrof_images)
            paths_batch = paths[start_index:end_index]
            images = facenet.load_data(paths_batch, False, False, 160)
            feed_dict = { images_placeholder:images, phase_train_placeholder:False }
            emb_array[start_index:end_index,:] = sess.run(embeddings, feed_dict=feed_dict)
            
        predictions = model.predict_proba(emb_array)
        best_class_indices = np.argmax(predictions, axis=1)
        best_class_probabilities = predictions[np.arange(len(best_class_indices)), best_class_indices]
                    
        for i in range(len(best_class_indices)):
            print('%4d  %s: %.3f' % (i, class_names[best_class_indices[i]], best_class_probabilities[i]))

        classifyDictionary = dict()
        classifyDictionary["classifyPeopleName"] = class_names[best_class_indices[i]]
        classifyDictionary["classifyRate"] = best_class_probabilities[i]
        return classifyDictionary
            
