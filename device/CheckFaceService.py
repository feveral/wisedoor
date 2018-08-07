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


