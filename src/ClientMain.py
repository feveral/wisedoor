from Camera import CameraControl
from OpencvAlign import OpencvAlign
from Classify import Classify 
import cv2

main = CameraControl()
classify = Classify()
while(True):
    a = input("input:")
    print(a)
    if a == "o":
        main.openCamera()
    if a == 'q':
        main.closeCamera()
    if a == 't':
        frame = main.CatchImage()
        cut = OpencvAlign(frame)
        cut.Cut()
        cut.Resize()
        classify.classifyImage()    