const fs = require('fs')
const Equipment = require('../models/Equipment')
const User = require('../models/User')
const FaceBelongModel = require('../models/FaceBelongModel')
const Model = require('../models/Model')

module.exports = {

  GetNewModel(req, res) {
    const equipmentName = req.body.equipmentName
    const userEmail = req.body.email
    const userPassword = req.body.password
    try {
      if (User.IsSignInCorrect(userEmail, userPassword)) {
        res.send({ error: 'wrong email or password' })
      }
    } catch (error) {
      res.send({ error: 'wrong email or password' })
    }
    const equipmentId = await Equipment.FindIdByOwnerEmailAndName(userEmail,equipmentName)
    const modelId = await Equipment.FindModelIdByEquipmentId(equipmentId)
    fs.readFile("./facenetTrain/models/${modelId}.pkl", (err, data) => {
      res.send(data)
    })
  },

  async NotifyTrainFinish(req, res){
    await Equipment.UpdateModelIdByEquipmentId(req.body.equipmentId,req.body.modelId)
    await Model.UpdateIsTrainValue(req.body.modelId,true)
    req.body.faceIdList.forEach(async (faceIdIndex)=>{
        faceId = await FaceBelongModel.Add(faceIdIndex,req.body.modelId)
    })
    res.send("data is receive")
  }
}