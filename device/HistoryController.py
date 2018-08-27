from DoorRecord import DoorRecord
class HistoryController():
    def __init__(self,user_email,password,equipment_name):
        self.doorRecordList = []
        self.user_email = user_email
        self.password = password
        self.equipment_name = equipment_name

    def uploadRecord(self):
        payload = {'email':self.user_email,'password':self.password,'equipmentName':self.equipment_name}
        try:
            new_record = requests.post(config.SERVER_URL + "api/model", json=payload, verify = False)
        except Exception as e:
            print('internet error while uploading record.')
            for record in self.doorRecordList:
                record.saveData("record.txt")


    def AddRecord(self,doorState,openDoorType,openPeopleName,image):
        newRecord = DoorRecord(doorState,openDoorType,openPeopleName,image)
        newRecord.GetTime()
        self.doorRecordList.append(newRecord)


