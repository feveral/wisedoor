from __future__ import print_function
import cv2
import os
import binascii

def getRandomFileName(type):
    return binascii.b2a_hex(os.urandom(15)).decode("utf-8")  + '.' + type

def findNumberOfFile(path):
    path, dirs, files = os.walk(path).next()
    return len(files)

def saveImage(path,frame):
	#print(path)
	cv2.imwrite(path , frame)

def createFolder(directory):
    if not os.path.exists(directory):
        os.makedirs(directory)

def align(image_path,size=160):
    casc_path = './haarcascade_frontalface_default.xml'
    face_cascade = cv2.CascadeClassifier(casc_path)
    image = cv2.imread(image_path)
    # cv2.imshow("Faces found", image)
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    faces = face_cascade.detectMultiScale(
        gray,
        scaleFactor=1.25,
        minNeighbors=2,
        minSize=(30, 30),
    )

    for (x, y, w, h) in faces:
        cutImg = image[y:y + h,x:x + w]
        resizeImg = cv2.resize(cutImg,(160,160)) 
        cv2.imwrite(image_path, resizeImg)
    if len(faces)==0:
    	return False
    return True

