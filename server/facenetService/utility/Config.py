import os

class Config():
    def __init__(self):
        self.model_path = "./facenetService/models/20170512-110547.pb"
        self.unknown_path = "./facenetService/image/unknown"
        self.cutBasePath = os.getcwd() + '/facenetService/image/cut'
        self.outputFaceBasePath = os.getcwd() + '/facenetService/models/faces'
        self.outputModelBasePath = os.getcwd() + '/facenetService/models'