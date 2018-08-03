import cv2
import os
import shutil
import numpy as np

class OpencvAlign:
    def __init__(self,image):
        self.image = image
        self.faces = []

    def Cut(self):
        casc_path = './haarcascade_frontalface_default.xml'
        face_cascade = cv2.CascadeClassifier(casc_path)
        self.faces = face_cascade.detectMultiScale(
            self.image,
            scaleFactor=1.25,
            minNeighbors=2,
            minSize=(30, 30),
        )
        #print ('Found {0} faces!'.format(len(self.faces)) )
        for (x, y, w, h) in self.faces:
            if(len(self.faces) > 0 and w > 120 and h > 160):
                return True
            else:
                return False


    def resize(self):
        for (x, y, w, h) in self.faces:
            cutImg = self.image[y:y + h,x:x + w]
            return cv2.resize(cutImg,(160,160)) 

    def saveImage(self,path,resizeImg):
        cv2.imwrite(path , resizeImg)

    def getCutImage(self):
        for (x, y, w, h) in self.faces:
            cutImg = self.image[y:y + h,x:x + w]
            return cutImg 
