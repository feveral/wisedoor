import numpy as np
import os
import cv2

def is_blurr(frame,threshold=65):
  #image = cv2.imread(input_path)
  blurr_degree = cv2.Laplacian(frame,cv2.CV_64F).var()
  return not(blurr_degree > threshold)
