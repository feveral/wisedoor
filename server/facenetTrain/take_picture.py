# -*- coding: utf-8 -*-
from FacenetAlign import *
from Train import *
from Camera import Camera
import shutil
import time
import os
import numpy as np
import cv2
import sys
import argparse
from utility import *


def main():
    saveDirName = './image/raw/';
    dirName = input("what is your name:")
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
    if os.path.exists('./image/raw/demo/' +  dirName):
        shutil.rmtree('./image/raw/demo/' +  dirName)
        os.makedirs('./image/raw/demo/' + dirName)

    cap = cv2.VideoCapture(0)

    count = 0
    while(True):

        # Capture frame-by-frame
        ret, frame = cap.read()

        # Our operations on the frame come here
        # gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

        # Display the resulting frame
        cv2.imshow('frame',frame)

        if cv2.waitKey(1) & 0xFF == ord('c'):
            imagePath = rawFolder + dirName + "/" + str(count) + '.jpg'
            cv2.imwrite(imagePath,frame)
            count += 1
            if count == 25:
                time.sleep(2)
                CutPicture(rawFolder,cutFolder)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            print('start aligning')

    # When everything done, release the capture
    cap.release()
    cv2.destroyAllWindows()

        cv2.imshow('frame',frame)

        if cv2.waitKey(1) & 0xFF == ord('c'):
            imagePath = rawFolder + dirName + "/" + str(count) + '.jpg'
            cv2.imwrite(imagePath,frame)
            count += 1
            if count == 25:
                time.sleep(2)
                CutPicture(rawFolder,cutFolder)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            print('start aligning')

    # When everything done, release the capture
    cap.release()
    cv2.destroyAllWindows()

if __name__ == '__main__':
    main()
