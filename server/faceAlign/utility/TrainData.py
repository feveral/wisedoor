class TrainData():
    def __init__(self,cutBasePath,outputBasePath,modelId,faceIdNamePairs):
        self.cutBasePath = cutBasePath
        self.outputBasePath = outputBasePath
        self.modelId = modelId
        self.faceIdNamePairs = faceIdNamePairs
        self.faceIdList = []
        for key, value in faceIdNamePairs.items() :
            self.faceIdList.append(key)
        self.ouputModelPath = str(outputBasePath) + "/" + str(modelId) + ".pkl"