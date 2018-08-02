class TrainData():
    def __init__(self,cutBasePath,outputBasePath,newFaceId,newFaceName,faceIdNamePairs):
        self.cutBasePath = cutBasePath
        self.outputBasePath = outputBasePath
        self.newFaceId = newFaceId
        self.newFaceName = newFaceName
        self.faceIdList = []
        for key, value in faceIdNamePairs.items() :
            self.faceIdList.append(key)
        self.outputFaceBasePath = str(outputBasePath) + "/faces/" + str(newFaceId) + ".pkl"