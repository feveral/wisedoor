import time
import Camera import Camera
import OpencvAlign import OpencvAlign
from requests.auth import HTTPBasicAuth
from Model import Model
from blurr import is_blurr
from Classify import *

class CheckFaceService():
    def __init__(self):
        self._camera = Camera(0)
        self._classify_result = {'unknown',0.0}
        self._model = self.Model("feveraly@gmail.com",5566,'家裡的門')
        self._classify = Classify()
        self._time_count = 0
        self._classify_fail_count = 0
        self._frame = []

    def catch_frame(self):
        self._frame = self._camera.CatchImage()

    def is_blurr_frame(self):
        return is_blurr(self._frame))
    
    def is_cut_frame(self):
        return  align.cut(self._frame)

    def is_classify_unknown_frame(self):
        classify_result = classify.classify_image(align.image,self._model)
        align.clear()

    def clear_time_count(self):
        self._time_count = 0

    def clear_classify_fail_count(self):
        self._classify_fail_count = 0
    
    def is_classify_wrong_twice(self):
        if(self._classify_fail_count >= 2):
            return True
        return False


