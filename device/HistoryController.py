from DoorRecord import DoorRecord
from pathlib import Path
import pickle
import cv2
import datetime
from TaskManager import taskManager
import requests
import config
import base64
import numpy as np
import time
import os

class HistoryController():
    def __init__(self,user_email,password,equipment_name):
        self.doorRecordList = []
        self.newRecordList = []
        self.user_email = user_email
        self.password = password
        self.equipment_name = equipment_name
        self.is_Exist_Upload_Thread = False
        self.upload_thread_index = 0

    def loadRecordFile(self):
        my_file = Path("record.pkl")
        data_count = 0
        if my_file.is_file():
            with open('record.pkl', 'rb') as f:
                while 1:
                    try:
                        record = pickle.load(f)
                        data_count += 1
                        self.doorRecordList.append(record)
                    except EOFError:
                        print(str(data_count) +  "data has been read")
                        break

    def uploadRecord(self):
        self.loadRecordFile()
        while(len(self.doorRecordList) > 0 or len(self.newRecordList) > 0):
            try:
                if(len(self.newRecordList) > 0):
                    self.doorRecordList.extend(self.newRecordList)
                    self.newRecordList = []
                    self.is_save_file = False

                new_record = self.doorRecordList[0]
                payload = {'email':self.user_email,'password':self.password,'equipmentName':self.equipment_name,
                            'time':str(new_record.time),'doorState':new_record.door_State,'openDoorType':new_record.open_Door_Type,
                            'openPeopleName':new_record.open_People_Name,'image':(base64.b64encode(new_record.image)).decode('utf-8')}
                state = requests.post(config.SERVER_URL + "api/history/test", json=payload, verify = False)
                self.doorRecordList.remove(new_record)

                os.remove("record.pkl")
                with open('record.pkl', 'wb') as f:
                    for record in self.doorRecordList:
                        pickle.dump(record, f)

            except Exception as e:
                print('internet error while uploading record.')

                if(len(self.doorRecordList) > 0 and not self.is_save_file):
                    with open('record.pkl', 'wb') as f:
                        for record in self.doorRecordList:
                            pickle.dump(record, f)
                        self.is_save_file = True

        taskManager.stopList[self.upload_thread_index] = True
        self.is_Exist_Upload_Thread = False

    def AddRecord(self,doorState,openDoorType,openPeopleName,image):
        newRecord = DoorRecord(self.GetTime(),doorState,openDoorType,openPeopleName,image)
        self.newRecordList.append(newRecord)
        if(not self.is_Exist_Upload_Thread):
            self.upload_thread_index = taskManager.add_task(self.uploadRecord,1)
            self.is_Exist_Upload_Thread = True
            taskManager.stopList[self.upload_thread_index] = False

    def GetTime(self):
        print(datetime.datetime.now())
        return datetime.datetime.now()


