import datetime
import cv2
import os
import binascii
class DoorRecord():
    def __init__(self,doorState,openDoorType,openPeopleName,image):
        self._time = None
        self._door_State = doorState
        self._open_Door_Type = openDoorType
        self._open_People_Name = openPeopleName
        self._image = image
        self._image_file_path = None
        self._is_recorded = False

    def GetTime(self):
        self._time = datetime.datetime.now()
        print(self._time)

    def saveData(self,filepath):
        if(not self._is_recorded):
            self._image_file_path = "./image/" + str((binascii.hexlify(os.urandom(16)))).split("'")[1] + ".jpg"
            cv2.imwrite(self._image_file_path , self._image)
            with open(filepath, 'a') as the_file:
                the_file.write(str(self._time) + "/" + 
                                str(self._door_State) + "/" + 
                                str(self._open_Door_Type) + "/" + 
                                str(self._open_People_Name) + "/" + 
                                str(self._image_file_path) + "\n")
            self._is_recorded = True
            