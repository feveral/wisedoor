import cv2
import os
import shutil
import numpy as np


def DetectImageFace(imageDirPath,imageName,destinationFilePath =""):
    image_path = imageDirPath +  imageName + ".png"

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

    print ('Found {0} faces!'.format(len(faces)) )

    for (x, y, w, h) in faces:
        cutImg = image[y:y + h,x:x + w]
        resizeImg = cv2.resize(cutImg,(160,160)) 
        cv2.imwrite(destinationFilePath + imageName + "_cut.png" , resizeImg)

    # if len(faces) == 0:
    #     pass
        #resizeImg = cv2.resize(image,(160,160))
        #cv2.imwrite(destinationFilePath + imageName + "_cut.png" , resizeImg)

    cv2.waitKey(0)
    cv2.destroyAllWindows()

def CreateFolder(directory):
    if not os.path.exists(directory):
        os.makedirs(directory)

rawDirName = "./../image/raw/"
cutDirName = "./../image/cut/"
dirList = os.listdir(rawDirName)

for dirName in dirList:
    imagePathList = os.listdir(rawDirName + dirName)
    for imagePath in imagePathList:
        imageName = imagePath.split('.')[0]
        CreateFolder(cutDirName + dirName)
        DetectImageFace( rawDirName + dirName + '/', imageName , cutDirName + dirName + '/')
