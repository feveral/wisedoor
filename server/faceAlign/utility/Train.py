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

from utility import facenet
from utility.TrainData import TrainData
import tensorflow as tf
import numpy as np
import argparse
import os
import sys
import math
import pickle
from sklearn.svm import SVC

batch_size = 1000
nrof_images = 1
image_size = 160
model_path = "./facenetTrain/20170512-110547.pb"
unknown_path = "./facenetTrain/image/unknown"

class Train:
    def __init__(self):
        self.trainDataList = []
        
    def trainModel(self, DirList, input_dir, output_dir):
        self.specificDirList = DirList
        with tf.Graph().as_default():
        
            with tf.Session() as sess:
                
                np.random.seed(seed=666)
                dataset = self.get_dataset(input_dir,self.specificDirList)

                # Check that there are at least one training image per class
                for cls in dataset:
                    assert(len(cls.image_paths)>0, 'There must be at least one image for each class in the dataset')            

                paths, labels = facenet.get_image_paths_and_labels(dataset)
                # print('Number of classes: %d' % len(dataset))
                # print('Number of images: %d' % len(paths))
                
                # Load the model
                # print('Loading feature extraction model')
                facenet.load_model(model_path)
                
                # Get input and output tensors
                images_placeholder = tf.get_default_graph().get_tensor_by_name("input:0")
                embeddings = tf.get_default_graph().get_tensor_by_name("embeddings:0")
                phase_train_placeholder = tf.get_default_graph().get_tensor_by_name("phase_train:0")
                embedding_size = embeddings.get_shape()[1]
                
                # Run forward pass to calculate embeddings
                # print('Calculating features for images')
                nrof_images = len(paths)
                nrof_batches_per_epoch = int(math.ceil(1.0*nrof_images / batch_size))
                emb_array = np.zeros((nrof_images, embedding_size))
                for i in range(nrof_batches_per_epoch):
                    start_index = i*batch_size
                    end_index = min((i+1)*batch_size, nrof_images)
                    paths_batch = paths[start_index:end_index]
                    images = facenet.load_data(paths_batch, False, False, image_size)
                    feed_dict = { images_placeholder:images, phase_train_placeholder:False }
                    emb_array[start_index:end_index,:] = sess.run(embeddings, feed_dict=feed_dict)
                
                classifier_filename_exp = os.path.expanduser(output_dir)

                # Train classifier
                # print('Training classifier')
                model = SVC(kernel='linear', probability=True)
                model.fit(emb_array, labels)
            
                # Create a list of class names
                class_names = [ cls.name.replace('_', ' ') for cls in dataset]

                # Saving classifier model
                with open(classifier_filename_exp, 'wb') as outfile:
                    pickle.dump((model, class_names), outfile)
                print('-----------------Saved classifier model to file "%s"' % classifier_filename_exp)
                
    def get_dataset(self, path, specificDirList,has_class_directories=True):
        dataset = []
        path_exp = os.path.expanduser(path)
        classes = [path for path in os.listdir(path_exp) \
                        if os.path.isdir(os.path.join(path_exp, path))]
        classes.sort()
        nrof_classes = len(classes)
        for i in range(nrof_classes):
            class_name = classes[i]
            facedir = os.path.join(path_exp, class_name)
            image_paths = self.get_image_paths(facedir,class_name,specificDirList)
            dataset.append(facenet.ImageClass(class_name, image_paths))

        unknown_image_path = self.get_image_paths(unknown_path,"unknown",specificDirList)
        dataset.append(facenet.ImageClass("unknown",unknown_image_path))
        return dataset

    def get_image_paths(self,facedirPath,facedirName,specificDirList):
        image_paths = []
        if os.path.isdir(facedirPath) and ((facedirName == "unknown") or (facedirName in specificDirList)):
            images = os.listdir(facedirPath)
            image_paths = [os.path.join(facedirPath,img) for img in images]
        return image_paths

    def AddTrainData(self,faceIdList,cutBasePath,outputBasePath,modelId):
        newTrainData = TrainData(faceIdList,cutBasePath,outputBasePath,modelId)
        self.trainDataList.append(newTrainData)

    def GetOldestData(self):
        return self.trainDataList[0]
        
    def GetTrainDataListSize(self):
        return len(self.trainDataList)

    def PopOldestData(self):
        self.trainDataList.pop(0)
        return "ok"





