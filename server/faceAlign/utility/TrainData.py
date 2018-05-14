class TrainData():
    def __init__(self,faceIdList,cutBasePath,outputBasePath,modelId):
        self.faceIdList = faceIdList
        self.cutBasePath = cutBasePath
        self.outputBasePath = outputBasePath
        self.modelId = modelId
        self.ouputModelPath = str(outputBasePath) + "/" + str(modelId) + ".pkl"