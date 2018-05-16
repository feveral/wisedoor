class TrainData():
    def __init__(self,faceIdList,cutBasePath,outputBasePath,modelId,faceIdNameDictionary):
        self.faceIdList = faceIdList
        self.cutBasePath = cutBasePath
        self.outputBasePath = outputBasePath
        self.modelId = modelId
        self.faceIdNameDictionary = faceIdNameDictionary
        self.ouputModelPath = str(outputBasePath) + "/" + str(modelId) + ".pkl"