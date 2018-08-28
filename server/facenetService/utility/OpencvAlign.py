import cv2
import os
import shutil
import numpy as np

class OpencvAlign:
    def __init__(self):
        self._image = None
        self._faces = None
        self._count = 0

    def cut(self,frame):
        self._image = frame
        casc_path = './facenetService/utility/haarcascade_frontalface_default.xml'
        face_cascade = cv2.CascadeClassifier(casc_path)
        self._faces = face_cascade.detectMultiScale(
            frame,
            scaleFactor=1.25,
            minNeighbors=2,
            minSize=(30, 30),
        )
        for index, (x, y, w, h) in enumerate(self._faces):
            if (len(self._faces) > 0 and w > 120 and h > 160):
                self._faces = [self._faces[index]]
                #self.saveImage('./image/test'+ str(self._count) + '.png')
                self._count += 1
                self._resize()
                return True
            else:
                return False

    def _resize(self):
        for (x, y, w, h) in self._faces:
            self._image = self._image[y:y + h,x:x + w]
            self._image = cv2.resize(self._image,(160,160))
    
    def saveImage(self,path):
        cv2.imwrite(path , self._image)

    def clear(self):
        self._image = None
        self._faces = None

    @property
    def image(self):
        return self._image
