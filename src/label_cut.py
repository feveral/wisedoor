import cv2
import os
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

    print 'Found {0} faces!'.format(len(faces)) 

    for (x, y, w, h) in faces:
        cutImg = image[y:y + h,x:x + w]
        resizeImg = cv2.resize(cutImg,(160,160)) 
        cv2.imwrite(destinationFilePath + imageName + "_cut.png" , resizeImg)

    cv2.waitKey(0)
    cv2.destroyAllWindows()


lfw_Image_Dir_Name = "./../image/test/"
lfw_Destination_Dir_Name = "./../image/test_cut/"
model_dir_list = os.listdir(lfw_Image_Dir_Name)


img_count = 1

for img_Index in model_dir_list:
    img_Index_Name = img_Index.split('.')[0]
    print img_Index_Name
    DetectImageFace((lfw_Image_Dir_Name),img_Index_Name,lfw_Destination_Dir_Name)
    print img_count 
    img_count += 1
