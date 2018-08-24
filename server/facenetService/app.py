#!flask/bin/python
from flask import Flask, jsonify
from flask import abort
from flask import request
import sys
import threading
from utility.facenetAlign import *
from utility.Train import Train
from utility.Model import Model
from utility.blurr import *
from utility.Config import Config
import logging
import requests
import json
import time
import urllib3
import time
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

app = Flask(__name__)
cutPicture = CutPicture() 
config = Config()
train = Train()
model = Model()

log = logging.getLogger('werkzeug')
log.setLevel(logging.ERROR)

def TrainModel():
    while(1):
        if(train.GetTrainDataListSize() == 0):
            time.sleep(0.5)
        else:
            data = train.GetOldestData()
            train.trainModel(
                            data.cutBasePath,
                            data.outputFaceBasePath,
                            data.newFaceId,
                            data.newFaceName)
            model.produce_model()
            model.save_model()
            postAnswer = requests.post('https://localhost/api/model/notify', data =  {'faceIdList':data.faceIdList,
                                                                                    'modelId':model.modelId},
                                                                                    verify = False)

thread = threading.Thread(target=TrainModel)
thread.setDaemon(True)
thread.start()

@app.route('/align', methods=['POST'])
def alignPicture():
    start = time.time()
    data = request.form
    uploadBasePath = data['uploadBasePath']
    faceId = data['faceId']
    imageName = data['imageName']
    cutBasePath = data['cutBasePath']
    if not os.path.exists(cutBasePath + "/" + faceId):
        os.makedirs(cutBasePath+ "/" + faceId)
    #if not (is_blurr(uploadBasePath+ "/" + faceId + "/" + imageName)):
    #    cutPicture.align(uploadBasePath+ "/" + faceId + "/" + imageName, cutBasePath, faceId)
    #    return jsonify({'success': True})
    end = time.time()
    print("other:",end - start)
    cutPicture.align(uploadBasePath+ "/" + faceId + "/" + imageName, cutBasePath, faceId)
    print("alignnnnnn:",time.time() - end)
    return jsonify({'success': True})
    #else:
    #    return jsonify({'success': False})

@app.route('/train', methods=['POST'])
def trainPicture():
    cutBasePath = request.form.get('cutBasePath')
    outputBasePath = request.form.get('outputBasePath')
    modelId = request.form.get('modelId')
    newFaceId = request.form.get('newFaceId')
    newFaceName = request.form.get('newFaceName')
    faceIdNamePairs = json.loads(request.form.get('faceIdNamePairs'))
    model.set_faceIdNamePair(faceIdNamePairs)
    model.set_modelId(modelId)
    train.AddTrainData(cutBasePath,outputBasePath,newFaceId,newFaceName,faceIdNamePairs)
    return jsonify({'success': 'start training'})

@app.route('/retrain', methods=['POST'])
def reTrainModel():
    outputBasePath = request.form.get('outputBasePath')
    modelId = request.form.get('modelId')
    faceIdNamePairs = json.loads(request.form.get('faceIdNamePairs'))
    model.set_faceIdNamePair(faceIdNamePairs)
    model.set_modelId(modelId)
    start = time.time()
    model.produce_model()
    model.save_model()
    print(faceIdNamePairs)
    print("waste time:" + str(time.time() - start))
    return jsonify({'success': 'retrain ok'})

if __name__ == '__main__':
    app.run(host='localhost', debug=True, port = 3000, use_reloader=False)
