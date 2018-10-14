"""Performs face alignment and calculates L2 distance between the embeddings of images."""

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

from scipy import misc
import tensorflow as tf
import numpy as np
import sys
sys.path.insert(0, "./utility")
import os
import argparse
import facenet
import align.detect_face

def main(args):

    images,names = load_and_align_data(args.image_files, args.image_size, args.margin, args.gpu_memory_fraction)
    with tf.Graph().as_default():

        with tf.Session() as sess:
      
            # Load the model
            facenet.load_model(args.model)
    
            # Get input and output tensors
            images_placeholder = tf.get_default_graph().get_tensor_by_name("input:0")
            embeddings = tf.get_default_graph().get_tensor_by_name("embeddings:0")
            phase_train_placeholder = tf.get_default_graph().get_tensor_by_name("phase_train:0")

            for i in range(0,len(images)):
                embeddings_list = []
                # Run forward pass to calculate embeddings
                embeddings_list.append(images[0])
                embeddings_list.append(images[i])
                feed_dict = { images_placeholder: embeddings_list, phase_train_placeholder:False }
                emb = sess.run(embeddings, feed_dict=feed_dict)
                
                nrof_images = len(args.image_files)
                print(nrof_images)
                print('Images:')
                print('%1d: %s' % (i, names[i]))
                print('')
                
                for i in range(nrof_images):
                    print('%1d  ' % i, end='')
                    for j in range(nrof_images):
                        dist = np.sqrt(np.sum(np.square(np.subtract(emb[j,:], emb[i,:]))))
                        print('  %1.4f  ' % dist, end='')
                    print('')
            
            
def load_and_align_data(image_paths, image_size, margin, gpu_memory_fraction):
    tmp_image_paths = image_paths.copy()
    img_list = []
    name_list = []
    for image in tmp_image_paths:
        if(os.path.isdir(image)):
            for file in os.listdir(image):
                print(file)
                if file.endswith(".jpg") or file.endswith(".png"):
                    print(os.path.join(image, file))
                    image_path = os.path.join(image, file)
                    img = misc.imread(os.path.expanduser(image_path), mode='RGB')
                    img_list.append(img)
                    name_list.append(file)
                    
        else:
            img = misc.imread(os.path.expanduser(image), mode='RGB')
            img_list.append(img)
            name_list.append(image)
        
    images = np.stack(img_list)
    names = np.stack(name_list)
    return images,names

def parse_arguments(argv):
    parser = argparse.ArgumentParser()
    
    parser.add_argument('model', type=str, 
        help='Could be either a directory containing the meta_file and ckpt_file or a model protobuf (.pb) file')
    parser.add_argument('image_files', type=str, nargs='+', help='Images to compare')
    parser.add_argument('--image_size', type=int,
        help='Image size (height, width) in pixels.', default=160)
    parser.add_argument('--margin', type=int,
        help='Margin for the crop around the bounding box (height, width) in pixels.', default=44)
    parser.add_argument('--gpu_memory_fraction', type=float,
        help='Upper bound on the amount of GPU memory that will be used by the process.', default=1.0)
    return parser.parse_args(argv)

if __name__ == '__main__':
    main(parse_arguments(sys.argv[1:]))
