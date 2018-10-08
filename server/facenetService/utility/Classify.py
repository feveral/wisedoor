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

        mistake_number = 0
        ChangeToStranger = False
        second_class_indices = predictions[0].argsort()[-3:][::-1][1]
        second_class_probabilities = predictions[0][second_class_indices]
        if(predictions.shape[1] > 2):
            third_class_indices = predictions[0].argsort()[-3:][::-1][2]
            third_class_probabilities = predictions[0][third_class_indices]
        else:
            third_class_indices = 0
            third_class_probabilities = 0
        if(self.first_filter(class_names,best_class_indices,0)):
            if(self.second_filter(best_class_probabilities,0)):
                if(self.third_filter(best_class_probabilities,0) or self.forth_filter(class_names,second_class_indices,third_class_probabilities)):
                    mistake_number = mistake_number + 1
                    print(predictions[i])
                    print('%s  %s: %.3f' % (nameList[i], class_names[best_class_indices[i]], best_class_probabilities[i]))
                    print('%s  %s: %.3f' % (nameList[i], class_names[second_class_indices], second_class_probabilities))
                    print('%s  %s: %.3f' % (nameList[i], class_names[third_class_indices], third_class_probabilities))            
                    ChangeToStranger = True

        classify_people_name = class_names[best_class_indices[0]]
        classify_rate = best_class_probabilities[0]
        if(classify_people_name == "unknown" or ChangeToStranger):
            classify_rate = 1.0
        return (classify_people_name, classify_rate)
        
    def first_filter(self,class_names,best_class_indices,index):
        return (class_names[best_class_indices[index]] != "unknownNew")

    def second_filter(self,best_class_probabilities,index):
        return (best_class_probabilities[index] < 0.5)
    
    def third_filter(self,best_class_probabilities,index):
        return (best_class_probabilities[index] < 0.3) 

    def forth_filter(self,class_names,second_class_indices,third_class_probabilities):
        return (class_names[second_class_indices] != "unknownNew" or third_class_probabilities > 0.1) 

    def fetch_embedding_class_names(self, image_path):
        np.random.seed(seed=666)
        model = self._model
        class_names = self._class_names
        nrof_images = 1
        emb_array = np.zeros((nrof_images,  self.embedding_size))
        images = facenet.load_data([image_path], False, False, 160)
        feed_dict = { self.images_placeholder:images, self.phase_train_placeholder:False }
        emb_array[0:1,:] = self.sess.run(self.embeddings, feed_dict=feed_dict)
        return (emb_array, class_names)
