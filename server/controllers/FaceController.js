const Face = require('../models/Face')
const FaceBelongEquipment = require('../models/FaceBelongEquipment')

module.exports = {

  async GetFaces(req, res) {
    const equipmentId = req.params.equipmentId 
    const faces = await FaceBelongEquipment.FindFacesByEquipmentId(equipmentId)
    res.send(faces)
  }
}