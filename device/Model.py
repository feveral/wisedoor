import requests
import os
import pickle

class Model():
    def __init__(self,user_email,password,equipment_name):
        self.user_email = user_email
        self.password = password
        self.equipment_name = equipment_name
        self.model = None
        self.class_names = None
        self.model_path = "test.pkl"
        self.update()

    def update(self):  
        payload = {'email':self.user_email,'password':self.password,'equipmentName':self.equipment_name}
        new_model = requests.post("https://localhost/api/model", json=payload, verify = False)
        print(new_model)
        with open(self.model_path, 'wb') as outfile: 
            outfile.write(new_model.content)
            self.reload_model()

    def reload_model(self):
        classifier_filename_exp = os.path.expanduser(self.model_path)
        infile = open(classifier_filename_exp, 'rb')
        (self.model, self.class_names) = pickle.load(infile)
    
    def get_model(self):
        return self.model

    def get_class_names(self):
        return self.class_names
