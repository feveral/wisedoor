

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

batch_size = 1000
nrof_images = 1
image_size = 160
model_path = "./20170512-110547.pb"

class Train:
    def __init__(self,input_dir,output_dir):
  
        with tf.Graph().as_default():
        
            with tf.Session() as sess:
                
                np.random.seed(seed=666)
                print(input_dir)
                dataset = facenet.get_dataset(input_dir)
                
                # Check that there are at least one training image per class
                for cls in dataset:
                    assert(len(cls.image_paths)>0, 'There must be at least one image for each class in the dataset')            

                paths, labels = facenet.get_image_paths_and_labels(dataset)
                print(paths)
                facenet.load_model(model_path)
                
                # Get input and output tensors
                images_placeholder = tf.get_default_graph().get_tensor_by_name("input:0")
                embeddings = tf.get_default_graph().get_tensor_by_name("embeddings:0")
                phase_train_placeholder = tf.get_default_graph().get_tensor_by_name("phase_train:0")
                embedding_size = embeddings.get_shape()[1]
                
                nrof_images = len(paths)
                nrof_batches_per_epoch = int(math.ceil(1.0*nrof_images / batch_size))
                emb_array = np.zeros((nrof_images, embedding_size))
                for i in range(nrof_batches_per_epoch):
                    print(emb_array[i])
                    start_index = i*batch_size
                    end_index = min((i+1)*batch_size, nrof_images)
                    paths_batch = paths[start_index:end_index]
                    images = facenet.load_data(paths_batch, False, False, image_size)
                    feed_dict = { images_placeholder:images, phase_train_placeholder:False }
                    emb_array[start_index:end_index,:] = sess.run(embeddings, feed_dict=feed_dict)
                
                classifier_filename_exp = os.path.expanduser(output_dir)

                # Create a list of class names
                class_names = [ cls.name.replace('_', ' ') for cls in dataset]

                # Saving classifier model
                with open(classifier_filename_exp, 'wb') as outfile:
                    pickle.dump((emb_array, labels, class_names), outfile)
                print('-------------------------------------------Saved classifier model to file "%s"' % classifier_filename_exp)
                
def split_dataset(dataset, min_nrof_images_per_class, nrof_train_images_per_class):
    train_set = []
    test_set = []
    for cls in dataset:
        paths = cls.image_paths
        print(paths)
        # Remove classes with less than min_nrof_images_per_class
        if len(paths)>=min_nrof_images_per_class:
            np.random.shuffle(paths)
            train_set.append(facenet.ImageClass(cls.name, paths[:nrof_train_images_per_class]))
            test_set.append(facenet.ImageClass(cls.name, paths[nrof_train_images_per_class:]))
    return train_set, test_set




train = Train("./utility/new","./unknown.pkl")
