import numpy as np
import os
import cv2

def is_blurr(input_path,threshold=65):
  image = cv2.imread(input_path)
  blurr_degree = cv2.Laplacian(image,cv2.CV_64F).var()
  print(not(blurr_degree > threshold))
  return not(blurr_degree > threshold)