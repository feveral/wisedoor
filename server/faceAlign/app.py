#!flask/bin/python
from flask import Flask, jsonify
from flask import abort
from flask import request
import sys
import threading
from utility.facenetAlign import *
from utility.Train import Train
from utility.blurr import *
import logging

app = Flask(__name__)
cutPicture = CutPicture(); 
train = Train()

log = logging.getLogger('werkzeug')
log.setLevel(logging.ERROR)

def TrainModel():
    while(1):
        if(train.GetTrainDataListSize() == 0):
            time.sleep(0.5)
        else:
            train.trainModel(train.GetOldestData().specificDirList,train.GetOldestData().inputDir,train.GetOldestData().outputModelPath)
        
t = threading.Thread(target=TrainModel)
t.setDaemon(True)
t.start()

@app.route('/align', methods=['POST'])
def alignPicture():
    data = request.form
    uploadBasePath = data['uploadBasePath']
    faceId = data['faceId']
    imageName = data['imageName']
    cutBasePath = data['cutBasePath']
    if not os.path.exists(cutBasePath + "/" + faceId):
        os.makedirs(cutBasePath+ "/" + faceId)
    if not (is_blurr(uploadBasePath+ "/" + faceId + "/" + imageName)):
        cutPicture.align(uploadBasePath+ "/" + faceId + "/" + imageName, cutBasePath, faceId)
        return jsonify({'success': True})
    else:
        return jsonify({'success': False})

@app.route('/train', methods=['POST'])
def trainPicture():
    data = request.form
    specificDirList = data['specificDirList']
    inputDirPath = data['inputDir']
    outputModelPath = data['outputModelPath']
    train.AddTrainData(specificDirList,inputDirPath,outputModelPath)
    return jsonify({'waiting': "train"})

if __name__ == '__main__':
    app.run(host='localhost', debug=True, port = 3000, use_reloader=False)
