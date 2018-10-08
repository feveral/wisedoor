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
        if(classify_people_name == "unknown"):
            classify_rate = 1.0
        if(ChangeToStranger):
            classify_rate = 1.0
            classify_people_name = "unknown"
        return (classify_people_name, classify_rate)
    
    def first_filter(self,class_names,best_class_indices,index):
        return (class_names[best_class_indices[index]] != "unknownNew")

    def second_filter(self,best_class_probabilities,index):
        return (best_class_probabilities[index] < 0.5)
    
    def third_filter(self,best_class_probabilities,index):
        return (best_class_probabilities[index] < 0.3) 

    def forth_filter(self,class_names,second_class_indices,third_class_probabilities):
        return (class_names[second_class_indices] != "unknownNew" or third_class_probabilities > 0.1) 

