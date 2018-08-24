from utility.Config import Config
import os
import numpy as np
import pickle
from sklearn.svm import SVC

class Model():
    def __init__(self):
        self.config = Config()
        self.emb_array = np.array([])
        self.labels = []
        self.class_names = []
        self.modelId = ""
        self.faceIdNamePair = {}
        self.model = None

    def load_one_face(self,faceId):
        classifier_filename_exp = os.path.expanduser(self.config.outputFaceBasePath +  "/" + str(faceId) + ".pkl")
        infile = open(classifier_filename_exp, 'rb')
        (emb_array, labels, class_names) = pickle.load(infile)
        return (emb_array, labels, class_names)

    def set_modelId(self,modelId):
        self.modelId = modelId

    def set_faceIdNamePair(self,faceIdNamePair):
        self.faceIdNamePair = faceIdNamePair

    def produce_model(self):
        self.model = None
        emb_array, labels, class_names = self.load_one_face("unknown")
        self.emb_array = emb_array
        self.labels = [0] * len(emb_array[:])
        self.class_names = class_names
        for faceId,faceName in self.faceIdNamePair.items():
            emb_array, labels, class_names = self.load_one_face(faceId)
            labels = [self.labels[-1] + 1] * len(emb_array[:])
            self.emb_array = np.concatenate((self.emb_array,emb_array))
            self.labels = self.labels + labels
            self.class_names = self.class_names + class_names
            print(self.class_names)
            print(self.labels)
        self.model = SVC(kernel='linear', probability=True)
        self.model.fit(self.emb_array, self.labels)
    
    def save_model(self):
        with open(self.config.outputModelBasePath + "/" + str(self.modelId) + ".pkl", 'wb') as outfile:
            pickle.dump((self.model, self.class_names), outfile)
        print('-----------------Saved classifier model to file "%s"' % self.modelId + ".pkl")
