import cv2
import os
import binascii
import pickle
class DoorRecord():
    def __init__(self,time,doorState,openDoorType,openPeopleName,image):
        self.time = time
        self.door_State = doorState
        self.open_Door_Type = openDoorType
        self.open_People_Name = openPeopleName
        self.image = image
        self.is_dump = False