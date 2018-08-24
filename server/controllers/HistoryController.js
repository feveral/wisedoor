const History = require('../models/History')
const Face = require('../models/Face')
const Equipment = require('../models/Equipment')
const FaceBelongEquipment = require('../models/FaceBelongEquipment')

module.exports = {

    // openTime example : '2018-8-24 01:54:41'
    async AddHistory(req, res) {
        const userEmail = req.body.email
        const password = req.body.password
        const openTime = req.body.openTime
        const faceName = req.body.faceName
        const equipmentName = req.body.equipmentName
        try {
            const equipmentId = await Equipment.FindIdByOwnerEmailAndName(userEmail, equipmentName)
            const faceId = await Face.FindFaceIdByFaceNameAndEquipmentId(faceName, equipmentId)
            await History.Add(equipmentId, faceId, openTime)
            res.status(200).send({success: 'Add history successful.'})
        } catch (error) {
            res.status(500).send({error: 'fail to add history.'})
        }
    }
}