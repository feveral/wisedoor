import requests
import pickle
import cv2
import time 
from Classify import * 
from Camera import Camera
from OpencvAlign import OpencvAlign

new_model = requests.get("https://localhost/api/model", verify = False)
with open("test.pkl", 'wb') as outfile: 
    outfile.write(new_model.content)
print("download ok")

test_classifier_path = "./test.pkl"

count = 0
camera = Camera()
while(True):
    frame = camera.CatchImage()
    if cv2.waitKey(1) & 0xFF == ord('c'):
        start = time.time()
        cut = OpencvAlign(frame)
        if(cut.Cut()):
            cut.Resize()
            if(classify_image("./image/cut.png")) == True:
                count += 1
        end = time.time()
        print ("It cost %f sec" % (end - start))
    if(count == 5):
        break
