const History = require('../models/History')
const Face = require('../models/Face')
const Equipment = require('../models/Equipment')
const Model = require('../models/Model')
const FaceBelongEquipment = require('../models/FaceBelongEquipment')
const fs = require("fs")
const request = require('request')

module.exports = {
    
    async getRecord(req, res){
        const page = req.params.page 
        const equipmentId = req.params.equipmentId //req.body.equipmentId
        const RecordResult= await History.FindByEquipmentIdAndPage(equipmentId, page)
        Record = JSON.parse(JSON.stringify(RecordResult))
        for (var index = 0; index < Record.length; index++){
            let data
            try{
                data = fs.readFileSync("./facenetService/image/history/" + `${Record[index]["Id"]}.jpg`)
            }
            catch(error){
                data = fs.readFileSync(`./facenetService/image/no_pic.jpeg`)
            }
            base64Image = new Buffer(data, 'binary').toString('base64')
            Record[index]["FaceImage"] = base64Image
            Record[index]["OpenTime"] = module.exports.setTimeCorrect(Record[index]["OpenTime"])
        }
        res.status(200).send(Record)
    },

    async getPageAmount(req, res) {
        const amount = (await History.FindPageAmountByEquipmentId(req.params.equipmentId))
        res.status(200).send({amount:amount})
    },

    async AddHistory(req, res) {
        const userEmail = req.body.email
        const password = req.body.password
        const openTime = req.body.time
        const equipmentName = req.body.equipmentName
        const doorState = req.body.doorState
        const openDoorType = req.body.openDoorType
        const openPeopleName = req.body.openPeopleName
        try {
            console.log(doorState)
            const equipmentId = await Equipment.FindIdByOwnerEmailAndName(userEmail, equipmentName)
            const historyId = await History.Add(equipmentId, openPeopleName, openTime, doorState, openDoorType)
            const imagePath = "./facenetService/image/history/" + `${historyId}` + ".jpg"
            const modelId = await Equipment.FindModelIdByEquipmentId(equipmentId)
            const faceIdNamePairs = await FaceBelongEquipment.FindFaceIdNamePairByEquipmentId(equipmentId)
            if(doorState == "success" && openDoorType =="face")
            {
                const faceId = await Face.FindFaceIdByFaceNameAndEquipmentId(openPeopleName,equipmentId)
                module.exports.postOpenImageToAdapt(faceId,imagePath,modelId,faceIdNamePairs)
            }

            fs.writeFile(imagePath, req.body.image, 'base64', err => {
                if (err){
                    console.log(err)
                }
            })
            res.status(200).send({success: 'Add history successful.'})
        } catch (error) {
            console.log(error)
            res.status(500).send({error: 'fail to add history.'})
        }
    },

    setTimeCorrect: function(time){
        date = time.split("T")[0]
        hour = (parseInt(time.split("T")[1].split(":")[0]) + 8).toString()
        minute = parseInt(time.split("T")[1].split(":")[1])
        second = parseInt(time.split("T")[1].split(":")[2])
        time = date + " " +  module.exports.isNumberTwoBit(hour) + ":" + module.exports.isNumberTwoBit(minute) + ":" + module.exports.isNumberTwoBit(second)
        return time
    },

    isNumberTwoBit: function(number){
        if(number < 10){
            return "0" + number 
        }
        return number
    },

    postOpenImageToAdapt: async function(faceId,imagePath,modelId,faceIdNamePairs){
        await Model.UpdateIsTrainValue(modelId,false)
        const formData =
        {
            "faceIdNamePairs":JSON.stringify(faceIdNamePairs),
            "faceId": faceId,
            "imagePath": imagePath,
            "modelId": modelId,
        }
        request.post({ url: 'http://localhost:3000/adapt', formData: formData }
        , async (error, response, body) => {
            if (!error && response.statusCode == 200) {
                console.log("adapt finish")
            }
            else {
                console.log("error:" + error)
            }
        })
        await Model.UpdateIsTrainValue(modelId,true)
    }
}