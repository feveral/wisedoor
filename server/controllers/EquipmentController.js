const Equipment = require('../models/Equipment')
const FaceBelongEquipment = require('../models/FaceBelongEquipment')

module.exports = {

  async GetEquipments(req, res) {
    const equipments = await Equipment.FindEquipmentsByUserEmail('feveraly@gmail.com')
    res.send(equipments)
  },

  async register (req, res) {
    const userEmail = req.user
    const equipmentName = req.body.equipmentName
    try {
      await Equipment.Add(userEmail,equipmentName)
      res.status(200).send({success:'Add equipmemt successfully'}) 
    } catch (error) {
      res.status(500).send({ error: 'register equipment error' }) 
    }
  }
}