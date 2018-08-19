import requests
import json

class PasswordController():
    def __init__ (self,user_email,password,equipment_name):
        self._password = [5,6,7,8]
        self.user_email = user_email
        self.password = password
        self.equipment_name = equipment_name
        self.new_password = ""
        self.update()

    def update(self):  
        payload = {'email':self.user_email,'password':self.password,'equipmentName':self.equipment_name}
        try:
            self.new_password = requests.post("https://localhost/api/equipment/getPassword", json=payload, verify = False)
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

