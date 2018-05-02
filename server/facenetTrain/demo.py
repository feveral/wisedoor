from FacenetAlign import *
from Train import *
from Camera import Camera

rawFolder = './image/raw/demo'
cutFolder = './image/cut/demo'


camera = Camera()

for i in range(25):
    imageFrame = camera.CatchImage()
    imagePath = rawFolder + '/' + str(i) + '.jpg'
    camera.SaveImage( imagePath, imageFrame)
CutPicture(rawFolder,cutFolder)

