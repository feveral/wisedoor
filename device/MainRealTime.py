import requests
import pickle
import cv2
import time 
from Camera import Camera
from OpencvAlign import OpencvAlign
from requests.auth import HTTPBasicAuth
from Model import Model
from blurr import is_blurr
from Classify import * 
from CheckFaceService import *
from HistoryController import HistoryController

historyController = HistoryController()
# camera = Camera(0)
# classify_result = ('unknown', 0.0)
# model = Model("feveraly@gmail.com", 5566, '家裡的門')
# classify = Classify()
# align = OpencvAlign()
checkFaceService = CheckFaceService()
checkFaceService.record_task = historyController.AddRecord
checkFaceService.start_check()


# while(True):
#     if cv2.waitKey(1) & 0xFF == ord('q'):
#         break
#     frame = camera.CatchImage()
#     if (is_blurr(frame)):
#        continue
#     if (align.cut(frame)):
#        classify_result = classify.classify_image(align.image,model)
#        align.clear()
#     cv2.putText(frame,classify_result[0],(10,40),cv2.FONT_HERSHEY_COMPLEX, 0.8, (255, 0, 0), 1, cv2.LINE_AA)
#     cv2.putText(frame,str(classify_result[1]),(10,80),cv2.FONT_HERSHEY_COMPLEX, 0.8, (255, 0, 0), 1, cv2.LINE_AA)
#     cv2.imshow("Display window", frame)  
