import cv2
import time
import threading
import numpy as np

class Camera:
    def __init__(self, index=0):
        self._camera_index = index
        self.cap = None
        self.frame = []
        self.__openCamera()
        # self._catchImageThread = threading.Thread(target=self._keepCatchImage)
        # self._catchImageThread.setDaemon(True)
        # self._catchImageThread.start()

    def is_open(self):
        return self.cap.isOpened()

    def _keepCatchImage(self):
        while True:
            self.CatchImage()
            time.sleep(0.1)

    def CatchImage(self):
        if(not self.cap):
            self.__openCamera()
        ret, frame = self.cap.read()
        return frame

    def set_camera_index(self,index):
        self._camera_index = index

    def saveImage(self,path,imageFrame):
        cv2.imwrite(path,imageFrame)
    
    def __openCamera(self):
        self.cap = cv2.VideoCapture(self._camera_index)
        while not self.cap.isOpened():
            self.cap = cv2.VideoCapture(self._camera_index)
            time.sleep(0.2)
            print('camera is opening')

    def __closeCamera(self):
        self.cap.release()
