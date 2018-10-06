import requests
import json
import config

class PasswordController():
    def __init__ (self):
        self._password = [5,6,7,8]
        self.new_password = ""
        self.update()

    def update(self):  
        payload = {'email':config.USER_EMAIL,'password':config.USER_PASSWORD,'equipmentName':config.EQUIPMENT_NAME}
        try:
            self.new_password = requests.post("https://wisedoor.ml/api/equipment/getPassword", json=payload, verify = False)
        except Exception as e: 
            print('internet not connected while get password from server.')
            with open('password.txt') as f:
                self._password = f.read()
            return
        if(int(self.new_password.content) != self._password):
            self._password = int(self.new_password.content)
            with open('password.txt', 'w') as the_file:
                the_file.write(str(self._password))

    @property
    def password(self):
        return self._password

    @password.setter
    def password(self,new_password):
        self._password = new_password

