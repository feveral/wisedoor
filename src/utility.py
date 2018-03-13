import cv2
import os
import binascii

def getRandomFileName(type):
    return binascii.b2a_hex(os.urandom(15)) + '.' + type

def findNumberOfFile(path):
    path, dirs, files = os.walk(path).next()
    return len(files)

def saveImage(path,frame):
	print path
	cv2.imwrite(path , frame)