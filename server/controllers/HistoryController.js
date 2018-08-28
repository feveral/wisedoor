const History = require('../models/History')
const Face = require('../models/Face')
const Equipment = require('../models/Equipment')
const FaceBelongEquipment = require('../models/FaceBelongEquipment')
var fs = require("fs");

module.exports = {
    // openTime example : '2018-8-24 01:54:41'
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
            // console.log(req)
            const equipmentId = await Equipment.FindIdByOwnerEmailAndName(userEmail, equipmentName)
            const faceId = await Face.FindFaceIdByFaceNameAndEquipmentId(openPeopleName, equipmentId)
            const historyId = await History.Add(equipmentId, faceId, openTime, doorState)
            // var image = module.exports.b64EncodeUnicode(req.body.image)
            // console.log(image)
            fs.writeFile("./image/" + `${historyId}` + ".png", new Buffer((req.body.image), "base64"), function(err) {
                console.log(err)
            });
            res.status(200).send({success: 'Add history successful.'})
        } catch (error) {
            res.status(500).send({error: 'fail to add history.'})
        }
    },

    async Test(req,res){
        console.log(req.body.time)
        res.status(200).send({success: 'Add history successful.'})
    },

    b64EncodeUnicode: function (str) {
        return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
            return String.fromCharCode(parseInt(p1, 16))
        }))
    }
}