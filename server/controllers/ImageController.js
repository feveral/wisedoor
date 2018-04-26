const fs = require("fs")
const randomHex = require('randomhex');
const Equipment = require('../models/Equipment')
const Face = require('../models/Face')
const FaceBelongEquipment = require('../models/FaceBelongEquipment')
let count = 0

const uploadBasePath = `${process.cwd()}/facenetTrain/image/raw`

module.exports = { 


    async uploadFace (req, res) {
        let equipmentId = await Equipment.FindIdByOwnerEmailAndName(req.user, req.body.equipmentName);
        let faceId;
        if (await Face.IsFaceNameInEquipment(req.body.faceName, equipmentId)) {
            faceId = await Face.FindFaceIdByFaceNameAndEquipmentId(req.faceName, equipmentId)
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
                fs.readdir(`${uploadBasePath}/${faceId}`, (err, files) => {
                    res.send({ success: true, progress: files.length})
                });
            }
        });
    }
}