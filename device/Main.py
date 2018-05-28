import requests
import pickle
import cv2
import time 
from Camera import Camera
from OpencvAlign import OpencvAlign
from requests.auth import HTTPBasicAuth

# payload = {'equipmentName': '家裡的門', 'email': "feveraly@gmail.com",'password':5566}
# new_model = requests.post("https://localhost/api/model", json=payload, verify = False)

# with open("test.pkl", 'wb') as outfile: 
#     outfile.write(new_model.content)
#     #reload_model()
# print("download ok")
from Classify import * 

test_classifier_path = "./test.pkl"

count = 0
camera = Camera(1)
classifyList = []
while(True):
    frame = camera.CatchImage()
    if cv2.waitKey(1) :#& 0xFF == ord('c'):
        start = time.time()
        cut = OpencvAlign(frame)
        if(cut.Cut()):
            cut.Resize()
            classifyList = classify_image("./image/cut.png")
        end = time.time()
        time.sleep(0.1)
        
    classifyPersonName =  classifyList["classifyPeopleName"]
    classifyRate =  classifyList["classifyRate"] 
    cv2.putText(frame,classifyPersonName,(10,40),cv2.FONT_HERSHEY_COMPLEX, 0.5, (0, 255, 255), 1, cv2.LINE_AA)
    cv2.putText(frame,str(classifyRate),(10,60),cv2.FONT_HERSHEY_COMPLEX, 0.5, (0, 255, 255), 1, cv2.LINE_AA)
    cv2.imshow("Display window", frame)  
