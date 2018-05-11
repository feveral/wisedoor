const fs = require("fs")
const randomHex = require('randomhex');
const Equipment = require('../models/Equipment')
const Face = require('../models/Face')
const FaceBelongEquipment = require('../models/FaceBelongEquipment')
const request = require('request');

const uploadBasePath = `${process.cwd()}/facenetTrain/image/raw`
const cutBasePath = `${process.cwd()}/facenetTrain/image/cut`

module.exports = { 

    async uploadFace (req, res) {
        let equipmentId = await Equipment.FindIdByOwnerEmailAndName(req.user, req.body.equipmentName);
        let faceId;

        if (await Face.IsFaceNameInEquipment(req.body.faceName, equipmentId)) {
            faceId = await Face.FindFaceIdByFaceNameAndEquipmentId(req.body.faceName, equipmentId)
        } else {
            faceId = await Face.Add(req.body.faceName)
            await FaceBelongEquipment.Add(faceId,equipmentId)
        }
        
        if (!fs.existsSync(uploadBasePath + `/${faceId}` ) ) {
            fs.mkdirSync(uploadBasePath + `/${faceId}`) 
        }
        const imageName = (await randomHex(16).substring(2)) + '.png'
        
        fs.writeFile(`${uploadBasePath}/${faceId}/${imageName}`, req.body.image, 'base64', err => {
            if (err) res.status(500), send({
                error: 'an error has occured trying to upload image'
            }) 
            else {
                var formData =  
                { 
                    "uploadBasePath": uploadBasePath,
                    "faceId": faceId,
                    "imageName": imageName,
                    "cutBasePath": cutBasePath
                } 
                console.log(cutBasePath);
                request.post({url:'http://localhost:3000/align',formData: formData}
                    , (error, response, body) => {
                        if (!error && response.statusCode == 200) {
                            fs.readdir(`${cutBasePath}/${faceId}`, (err, files) => {
                                res.send({ success: true, progress: files.length})
                            });
                        }
                        else
                            console.log("error" + error);
                    }
                )
            }
        });
    }
}