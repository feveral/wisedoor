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

camera = Camera(1)
classify_result = ('unknown', 0.0)
model = Model("feveraly@gmail.com", 5566, '家裡的門')
classify = Classify()

while(True):
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break
    if cv2.waitKey(1) & 0xFF == ord('r'):
        print('reloading')
        model.reload_model()
        print('reloading over')
    if cv2.waitKey(1) & 0xFF == ord('c'):
        print('c')
        start = time.time()
        align = OpencvAlign(frame)
        if (is_blurr('./image/raw.png')):
            continue
        if(align.Cut()):
            resizeImg = align.resize()
            align.saveImage('./image/cut.png', resizeImg)
            classify_result = classify.classify_image("./image/cut.png",model)
            end = time.time()
            print("cost time", end - start)
    frame = camera.CatchImage()
    cv2.putText(frame,classify_result[0],(10,40),cv2.FONT_HERSHEY_COMPLEX, 0.8, (255, 0, 0), 1, cv2.LINE_AA)
    cv2.putText(frame,str(classify_result[1]),(10,80),cv2.FONT_HERSHEY_COMPLEX, 0.8, (255, 0, 0), 1, cv2.LINE_AA)
    cv2.imshow("Display window", frame)  