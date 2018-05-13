const fs = require("fs")
const randomHex = require('randomhex');
const Equipment = require('../models/Equipment')
const Face = require('../models/Face')
const FaceBelongEquipment = require('../models/FaceBelongEquipment')
const request = require('request');

const uploadBasePath = `${process.cwd()}/facenetTrain/image/raw`
const cutBasePath = `${process.cwd()}/facenetTrain/image/cut`

module.exports = { 

    async retrieveEquipmentId (req, res, next) {
        req.equipmentId = await Equipment.FindIdByOwnerEmailAndName(req.user, req.body.equipmentName)
        next()
    },

    async retrieveFaceId (req, res, next) {
        if (await Face.IsFaceNameInEquipment(req.body.faceName, req.equipmentId)) {
            req.faceId = await Face.FindFaceIdByFaceNameAndEquipmentId(req.body.faceName, req.equipmentId)
        } else {
            req.faceId = await Face.Add(req.body.faceName, false)
            await FaceBelongEquipment.Add(req.faceId, req.equipmentId)
        }
        next()
    },

    makeUploadDirectIfnotExist (req, res, next) {
        if (!fs.existsSync(uploadBasePath + `/${req.faceId}`)) {
            fs.mkdirSync(uploadBasePath + `/${req.faceId}`)
        }
        next()
    },

    async saveRawImage (req, res, next) {
        req.imageName = (await randomHex(16).substring(2)) + '.png'
        fs.writeFile(`${uploadBasePath}/${req.faceId}/${req.imageName}`, req.body.image, 'base64', err => {
            if (err) res.status(500), send({
                error: 'an error has occured trying to upload image'
            }) 
            else
                next()
        })
    },

    async uploadFace (req, res) {
        const formData =  
        { 
            "uploadBasePath": uploadBasePath,
            "faceId": req.faceId,
            "imageName": req.imageName,
            "cutBasePath": cutBasePath
        } 
        request.post({url:'http://localhost:3000/align',formData: formData}
            , (error, response, body) => {
                if (!error && response.statusCode == 200) {
                    fs.readdir(`${cutBasePath}/${req.faceId}`, (err, files) => {
                        res.send({ success: true, progress: files.length})
                    });
                }
                else{
                    console.log("error" + error);
                    res.send({ error: "An error occured while uploading image" })
                }
            }
        )
    }
}