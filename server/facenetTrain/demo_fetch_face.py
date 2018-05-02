# -*- coding: utf-8 -*-
from FacenetAlign import *
from Train import *
from Camera import Camera
import shutil
import time
import os

dirName = input("what is your name:")
rawFolder = './image/raw/demo/'
cutFolder = './image/cut/demo/'
nowDirectory = sys.path[0] 
if not os.path.exists('./image/raw/demo/' +  dirName):
    os.makedirs('./image/raw/demo/' + dirName)

camera = Camera()
for i in range(25):
    imageFrame = camera.CatchImage()
    imagePath = rawFolder + dirName + "/" + str(i) + '.jpg'
    camera.SaveImage( imagePath, imageFrame)
shutil.copytree('./image/unknown/', './image/cut/demo/unknown')
time.sleep(2)
CutPicture = CutPicture(rawFolder,cutFolder)

