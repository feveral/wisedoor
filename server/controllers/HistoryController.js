const History = require('../models/History')
const Face = require('../models/Face')
const Equipment = require('../models/Equipment')
const FaceBelongEquipment = require('../models/FaceBelongEquipment')
var fs = require("fs");
const randomHex = require('randomhex')


module.exports = {
    async GetRecord(req, res){
        const userEmail = req.user
        const equipmentId = req.body.equipmentId
        const RecordResult= await History.FindDataByEquipmentId(equipmentId)
        Record = JSON.parse(JSON.stringify(RecordResult));
        for (var index = 0; index < Record.length; index++){
            Record[index]["FaceName"] = await Face.FindNameById(Record[index]["FaceId"])
            var data = fs.readFileSync("./image/" + `${Record[index]["Id"]}.jpg`)
            base64Image = new Buffer(data, 'binary').toString('base64')
            Record[index]["FaceImage"] = base64Image
            Record[index]["OpenTime"] = module.exports.setTimeCorrect(Record[index]["OpenTime"])
        }
        res.send(Record)
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
            console.log("post post")
            const equipmentId = await Equipment.FindIdByOwnerEmailAndName(userEmail, equipmentName)
            const faceId = await Face.FindFaceIdByFaceNameAndEquipmentId(openPeopleName, equipmentId)
            const historyId = await History.Add(equipmentId, faceId, openTime, doorState, openDoorType)
            fs.writeFile("./image/" + `${historyId}` + ".jpg", req.body.image, 'base64', err => {
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

    setTimeCorrect:function(time){
        date = time.split("T")[0]
        hour = (parseInt(time.split("T")[1].split(":")[0]) + 8).toString()
        minute = parseInt(time.split("T")[1].split(":")[1])
        second = parseInt(time.split("T")[1].split(":")[2])
        time = date + " " + hour + ":" + minute + ":" + second
        return time
    }

}