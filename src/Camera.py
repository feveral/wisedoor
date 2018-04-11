import cv2
import time

class CameraControl:
    def __init__(self):
        self.cap = None
        self.frame = []
    

    def CatchImage(self):
        self.__openCamera()
        ret, frame = self.cap.read()
        self.__closeCamera()  
        return frame
    
    def __openCamera(self):
        self.cap = cv2.VideoCapture(0)

    def __closeCamera(self):
        self.cap.release()
