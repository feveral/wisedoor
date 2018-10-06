const fs = require('fs')
const Equipment = require('../models/Equipment')
const ClassifyResult = require('../models/ClassifyResult')
const User = require('../models/User')
const FaceBelongModel = require('../models/FaceBelongModel')
const Model = require('../models/Model')
const request = require('request')
const imagePath = `${process.cwd()}/facenetService/image/classify_result/raw`

module.exports = {

    async saveClassifyData(req, res, next) {
        const userEmail = req.user
        const equipmentName = req.body.equipmentName
        const equipmentId = await Equipment.FindIdByOwnerEmailAndName(userEmail, equipmentName)

        req.modelId = await Equipment.FindModelIdByEquipmentId(equipmentId)
        if (req.modelId == null) {
            res.status(200).send({ success:false , reason: `You didn't have add any face.` })
            return
        }
        req.classifyResultId = await ClassifyResult.Add(equipmentId)
        fs.writeFile(`${imagePath}/${req.classifyResultId}.png`, req.body.image, 'base64', err => {
            if (err) {
                res.status(500).send({ error: 'an error has occured uploading image'})
            }
            else {
                next()
            }
        })
    },

    async classify(req, res) {
        const formData =
        {
            "modelId": req.modelId,
            "classifyResultId": req.classifyResultId,
        }
        request.post({ url: 'http://localhost:3000/classify', formData: formData }
            , (error, response, body) => {
                if (!error && response.statusCode == 200) {
                    const data = JSON.parse(response.body)
                    if (data.success) {
                        ClassifyResult.UpdateFaceNameById(req.classifyResultId, data.name, data.rate)
                        res.status(200).send({ success: true, name:data.name, rate:data.rate})
                    }
                    else {
                        res.status(200).send({ success: false, reason: 'detect no face' })
                    }
                }
                else {
                    res.status(500).send({ error: "An error occured while uploading image" })
                }
            }
        )
    },
}