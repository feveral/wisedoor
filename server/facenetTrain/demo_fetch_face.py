# -*- coding: utf-8 -*-
from FacenetAlign import *
from Train import *
from Camera import Camera
import time
import os
import shutil


dirName = raw_input("what is your name:")
rawFolder = './image/raw/demo/'
cutFolder = './image/cut/demo/'
nowDirectory = sys.path[0] 
if not os.path.exists(rawFolder):
    os.makedirs(rawFolder)
if not os.path.exists(cutFolder):
    os.makedirs(cutFolder)
if not os.path.exists('./image/raw/demo/' +  dirName):
    os.makedirs('./image/raw/demo/' + dirName)
if os.path.exists('./image/cut/demo/' +  dirName):
    shutil.rmtree('./image/cut/demo/' +  dirName)
    
camera = Camera()
for i in range(25):
    imageFrame = camera.CatchImage()
    imagePath = rawFolder + dirName + "/" + str(i) + '.jpg'
    camera.SaveImage( imagePath, imageFrame)

time.sleep(2)
CutPicture = CutPicture(rawFolder,cutFolder)

