const Equipment = require('../models/Equipment')
const FaceBelongEquipment = require('../models/FaceBelongEquipment')

module.exports = {

  async GetEquipments(req, res) {
    const equipments = await Equipment.FindEquipmentsByUserEmail('feveraly@gmail.com')
    res.send(equipments)
  }
}