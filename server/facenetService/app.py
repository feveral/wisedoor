#!flask/bin/python
from flask import Flask, jsonify
from flask import abort
from flask import request
import sys
import threading
import cv2
from utility.Classify import Classify
from utility.OpencvAlign import OpencvAlign
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
classify = Classify()
opencvAlign = OpencvAlign()

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
    #start = time.time()
    #cutPicture.align(uploadBasePath+ "/" + faceId + "/" + imageName, cutBasePath, faceId)
    #print("align time:", time.time() - start)
    #return jsonify({'success': True})
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
    model.produce_model()
    model.save_model()
    print("retrain finish")
    return jsonify({'success': 'retrain ok'})

@app.route('/classify', methods=['POST'])
def classify_image():
    modelId = request.form.get('modelId')
    classifyResultId = request.form.get('classifyResultId')
    classify.load_model(modelId)
    image_base_path = './facenetService/image/classify_result/'
    frame = cv2.imread(image_base_path + 'raw/' + classifyResultId + '.png')
    cutPicture.align(image_base_path + 'raw/' + classifyResultId + '.png', image_base_path ,'cut')
    if not os.path.exists(image_base_path + 'cut/' + classifyResultId + '.png'):
        return jsonify({'success': False, 'reason': 'detect no face'})
    else:
        result = classify.classify_image(image_base_path + 'cut/' + classifyResultId + '.png')
        return jsonify({'success': True, 'name': result[0], 'rate': result[1]})
@app.route('/adapt', methods=['POST'])
def adapt():
    faceId = request.form.get('faceId')
    imagePath = request.form.get('imagePath')
    modelId = request.form.get('modelId')
    faceIdNamePairs = json.loads(request.form.get('faceIdNamePairs'))
    (emb_array, class_names) = classify.fetch_embedding_class_names(imagePath)
    model.add_embedding_in_pkl(emb_array,faceId)
    model.set_faceIdNamePair(faceIdNamePairs)
    model.set_modelId(modelId)
    model.produce_model()
    model.save_model()
    print("adapt finish")
    return jsonify({'success': 'retrain ok'})

if __name__ == '__main__':
    app.run(host='localhost', debug=True, port = 3000, use_reloader=False)
