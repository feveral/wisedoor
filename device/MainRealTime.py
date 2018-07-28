import requests
import pickle
import cv2
import time 
from Camera import Camera
from OpencvAlign import OpencvAlign
from requests.auth import HTTPBasicAuth
<<<<<<< HEAD
from Model import Model

from Classify import * 

camera = Camera(1)
classify_result = ('unknown', 0.0)
model = Model("feveraly@gmail.com", 5566, '家裡的門')

while(True):
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break
    if cv2.waitKey(1) & 0xFF == ord('r'):
        print('reloading')
        model.reload_model()
        print('reloading over')
    frame = camera.CatchImage()
    align = OpencvAlign(frame)
    if(align.Cut()):
        align.Resize()
        classify_result = classify_image("./image/cut.png",model)
    cv2.putText(frame,classify_result[0],(10,40),cv2.FONT_HERSHEY_COMPLEX, 0.8, (255, 0, 0), 1, cv2.LINE_AA)
    cv2.putText(frame,str(classify_result[1]),(10,80),cv2.FONT_HERSHEY_COMPLEX, 0.8, (255, 0, 0), 1, cv2.LINE_AA)
=======

payload = {'equipmentName': '家裡的門', 'email': "feveraly@gmail.com",'password':5566}
new_model = requests.post("https://localhost/api/model", json=payload, verify = False)

with open("test.pkl", 'wb') as outfile: 
    outfile.write(new_model.content)
    #reload_model()
print("download ok")
from Classify import * 

test_classifier_path = "./test.pkl"

count = 0
camera = Camera(1)
classifyList = {"classifyPeopleName":'unknown',"classifyRate":0.0}
while(True):
    frame = camera.CatchImage()
    start = time.time()
    cut = OpencvAlign(frame)
    if(cut.Cut()):
        cut.Resize()
        classifyList = classify_image("./image/cut.png")
    end = time.time()
    time.sleep(0.1)
    classifyPersonName =  classifyList["classifyPeopleName"]
    classifyRate =  classifyList["classifyRate"] 
    cv2.putText(frame,classifyPersonName,(10,40),cv2.FONT_HERSHEY_COMPLEX, 0.8, (255, 0, 0), 1, cv2.LINE_AA)
    cv2.putText(frame,str(classifyRate),(10,80),cv2.FONT_HERSHEY_COMPLEX, 0.8, (255, 0, 0), 1, cv2.LINE_AA)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

>>>>>>> c57202a794038a2c2f44ee88ada6172f9e67cdc9
    cv2.imshow("Display window", frame)  