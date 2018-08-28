from __future__ import absolute_import
from __future__ import division
from __future__ import print_function

import tensorflow as tf
import numpy as np
import argparse
import os
import sys
import math
import pickle
from sklearn.svm import SVC
from utility import facenet
import time
import cv2

model_path  = "./facenetService/models/20170512-110547.pb"
init_image_path = "./facenetService/image/classify_result/init.png"

class Classify():
    def __init__(self):
        self.load_model('init_model')
        tensorflow_graph = tf.Graph()
        with tensorflow_graph.as_default():
            facenet.load_model(model_path)
            self.images_placeholder = tf.get_default_graph().get_tensor_by_name("input:0")
            self.embeddings = tf.get_default_graph().get_tensor_by_name("embeddings:0")
            self.phase_train_placeholder = tf.get_default_graph().get_tensor_by_name("phase_train:0")
            self.embedding_size =  self.embeddings.get_shape()[1]
        self.sess = tf.Session(graph=tensorflow_graph)
        self.classify_image(init_image_path)

    def load_model(self,modelId):
        classifier_filename_exp = os.path.expanduser('./facenetService/models/' + modelId + '.pkl')
        infile = open(classifier_filename_exp, 'rb')
        (self._model, self._class_names) = pickle.load(infile)

    def classify_image(self,image_path):
        np.random.seed(seed=666)

        model = self._model
        class_names = self._class_names

        nrof_images = 1
        emb_array = np.zeros((nrof_images,  self.embedding_size))

        images = facenet.load_data([image_path], False, False, 160)
        
        feed_dict = { self.images_placeholder:images, self.phase_train_placeholder:False }
        
        emb_array[0:1,:] = self.sess.run(self.embeddings, feed_dict=feed_dict)
        
        predictions = model.predict_proba(emb_array)
        best_class_indices = np.argmax(predictions, axis=1)
        best_class_probabilities = predictions[np.arange(len(best_class_indices)), best_class_indices]
                    
        classify_people_name = class_names[best_class_indices[0]]
        classify_rate = best_class_probabilities[0]
        return (classify_people_name, classify_rate)
