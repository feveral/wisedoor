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
import cv2

model_path  = "./models/20170512-110547.pb"
init_image_path = "./image/init.png"

class Classify():
    def __init__(self,model):
        self._model = model
        tensorflow_graph = tf.Graph()
        with tensorflow_graph.as_default():
            facenet.load_model(model_path)
            self.images_placeholder = tf.get_default_graph().get_tensor_by_name("input:0")
            self.embeddings = tf.get_default_graph().get_tensor_by_name("embeddings:0")
            self.phase_train_placeholder = tf.get_default_graph().get_tensor_by_name("phase_train:0")
            self.embedding_size =  self.embeddings.get_shape()[1]
        self.sess = tf.Session(graph=tensorflow_graph)
        init_frame = cv2.imread(init_image_path)
        self.classify_image(init_frame)

    def classify_image(self,image):
        np.random.seed(seed=666)

        model = self._model.get_model()
        class_names = self._model.get_class_names()

        nrof_images = 1
        emb_array = np.zeros((nrof_images,  self.embedding_size))

        images = facenet.load_data(image, False, False, 160)
        
        feed_dict = { self.images_placeholder:images, self.phase_train_placeholder:False }
        
        emb_array[0:1,:] = self.sess.run(self.embeddings, feed_dict=feed_dict)
        
        predictions = model.predict_proba(emb_array)
        best_class_indices = np.argmax(predictions, axis=1)
        best_class_probabilities = predictions[np.arange(len(best_class_indices)), best_class_indices]
                    
        classify_people_name = class_names[best_class_indices[0]]
        classify_rate = best_class_probabilities[0]
        return (classify_people_name, classify_rate)
