const Equipment = require('../models/Equipment')
const FaceBelongEquipment = require('../models/FaceBelongEquipment')
const User = require('../models/User')

module.exports = {

  async GetEquipments (req, res) {
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
  },

  async SetPassword (req, res){
    const userEmail = req.user
    const equipmentName = req.body.equipmentName
    const equipmentId = await Equipment.FindIdByOwnerEmailAndName(userEmail,equipmentName)
    try{
      await Equipment.UpdatePasswordByEquipmentId(equipmentId, req.body.password)
      res.status(200).send({success:'set equipmemt password  successfully'}) 
    } catch (error) {
      res.status(500).send({ error: 'set equipmemt password error' }) 
    }
    
  },

  async GetPassword(req, res) {
    const equipmentName = req.body.equipmentName
    const userEmail = req.body.email
    const userPassword = req.body.password
    const equipmentId = await Equipment.FindIdByOwnerEmailAndName(userEmail,equipmentName)
    const password = await Equipment.FindPasswordByEquipmentId(equipmentId)
    res.send(password)
  },
}