import time
import config
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
        self._model = Model(config.USER_EMAIL, config.USER_PASSWORD, config.EQUIPMENT_NAME)
        self._classify = Classify(self._model)
        self._align = OpencvAlign()
        self._timer = Timer()
        self._fail_count = 0
        self._success = True
        self._success_task = None
        self._record_task = None
        self.start = time.time()

    def start_check(self):
        if self._model.is_empty:
            return
        self._timer.start_timing()
        self._fail_count = 0
        self._success = False
        while self._fail_count < 3 and not self._success :
            frame = self._camera.CatchImage()
            start = time.time() 
            if (is_blurr(frame)):
                continue
            #if (self._timer.get_time_count() >= 5):
            #    return
            if (self._align.cut(frame)):
                classify_result = self._classify.classify_image(self._align.image)
                self._classify_result_handler(classify_result,frame)
                self._timer.start_timing()
                self._align.clear()
            print(time.time() - start)
    @property
    def model(self):
        return self._model
    
    @property
    def camera(self):
        return self._camera

    @property
    def check_success_task(self):
        return self._success_task

    @property
    def record_task(self):
        return self._record_task

    @check_success_task.setter
    def check_success_task(self, task):
        self._success_task = task

    @record_task.setter
    def record_task(self, task):
        self._record_task = task


    def _classify_result_handler(self,classify_result,frame):
        if (classify_result[0] == 'unknown'):
            print(str(classify_result[0])+":"+str(classify_result[1]))
            print('open lock fail')
            self._fail_count += 1
            if(self._fail_count >= 3 and self.record_task != None):
                self.record_task("fail","face",classify_result[0],frame)

        else:
            self.start = time.time()
            print(str(classify_result[0])+":"+str(classify_result[1]))
            print('open lock')
            if(self.record_task != None):
                self.record_task("success","face",classify_result[0],frame)
            self._success = True
            self._success_task()
