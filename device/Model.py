import requests
import os
import pickle
import config

init_model_path = "./init_model.pkl"

class Model():
    def __init__(self,user_email,password,equipment_name):
        self.user_email = user_email
        self.password = password
        self.equipment_name = equipment_name
        self.model = None
        self.class_names = None
        self._is_empty = False
        self.model_path = config.MODEL_PATH
        self.update()

    def update(self):  
        payload = {'email':self.user_email,'password':self.password,'equipmentName':self.equipment_name}
        try:
            new_model = requests.post(config.SERVER_URL + "api/model", json=payload, verify = False)
            print(new_model)
            if new_model.content == b'training':
                raise ValueError
            elif new_model.content == b'empty':
                raise ArithmeticError
            else:
                self._writing_model_file(new_model.content)
        except ValueError as e:
            print('model is training.')
        except ArithmeticError as e:
            print('no faces on server.')
            if os.path.exists(self.model_path):
                os.remove(self.model_path)
        except Exception as e:
            print('internet error while downloading model.')
        finally:
            self._reload_model()

    def _reload_model(self):
        classifier_filename_exp = os.path.expanduser(self.model_path)
        if not os.path.exists(classifier_filename_exp):
            classifier_filename_exp = os.path.expanduser(init_model_path)
            self._is_empty = True
        else:
            self._is_empty = False
        infile = open(classifier_filename_exp, 'rb')
        (self.model, self.class_names) = pickle.load(infile)
    
    def _writing_model_file(self,content):
        with open(self.model_path, 'wb') as outfile:
            outfile.write(content)
            self._reload_model()

    def get_model(self):
        return self.model

    def get_class_names(self):
        return self.class_names

    @property
    def is_empty(self):
        return self._is_empty
