#!flask/bin/python
from flask import Flask, jsonify
from flask import abort
from flask import request
import sys
from utility.facenetAlign import *
import logging

app = Flask(__name__)
cutPicture = CutPicture(); 

log = logging.getLogger('werkzeug')
log.setLevel(logging.ERROR)

@app.route('/align', methods=['POST'])
def alignPicture():
    data = request.form
    uploadBasePath = data['uploadBasePath']
    faceId = data['faceId']
    imageName = data['imageName']
    cutBasePath = data['cutBasePath']
    cutPicture.align(uploadBasePath+ "/" + faceId + "/" + imageName, cutBasePath, faceId)
    return jsonify({'success': data})

if __name__ == '__main__':
    app.run(host='localhost', debug=True, port=3000)
