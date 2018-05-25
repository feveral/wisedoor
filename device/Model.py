import requests

class Model():
    def __init__(user_email,password,equipment_name):
      self.user_email = user_email
      self.password = password 
    def update():  
        payload = {email:self.user_email,password:self.password,equipment:self.equipment_name}
        new_model = requests.post("https://localhost/api/model", json=payload, verify = False)
        with open("test.pkl", 'wb') as outfile: 
            outfile.write(new_model.content)
            reload_model()