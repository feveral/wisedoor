import cv2
import time

class Camera:
    def __init__(self):
        self.cap = None
        self.frame = []

    def CatchImage(self):
        if(not self.cap):
            self.__openCamera()
        ret, frame = self.cap.read()
        cv2.imshow("Display window", frame);  
        return frame

    def SaveImage(self,path,imageFrame):
        cv2.imwrite(path,imageFrame)
    
    def __openCamera(self):
        self.cap = cv2.VideoCapture(1)

    def __closeCamera(self):
        self.cap.release()
