import time
from Timer import Timer 
from Camera import Camera
from OpencvAlign import OpencvAlign
from requests.auth import HTTPBasicAuth
from Model import Model
from blurr import is_blurr
from Classify import Classify

class CheckFaceService():
    def __init__(self):
        self._camera = Camera(0)
        self._model = Model("feveraly@gmail.com", 5566, '家裡的門')
        self._classify = Classify()
        self._align = OpencvAlign()
        self._timer = Timer()
        self._fail_count = 0

    def start_check(self,to_do):
        self._timer.start_timing()
        self._fail_count = 0
        while self._fail_count < 3:
            frame = self._camera.CatchImage()
            if (is_blurr(frame)):
                continue
            if (self._timer.get_time_count() >= 5):
                return
            if (self._align.cut(frame)):
                classify_result = self._classify.classify_image(self._align.image,self._model)
                self._classify_result_handler(classify_result,to_do)
                self._timer.start_timing()
                self._align.clear()

    def _lassify_result_handler(self,classify_result,to_do):
        if (classify_result[0] == 'unknown'):
            self._fail_count += 1
        else:
            to_do()
