const fs = require('fs')
const Equipment = require('../models/Equipment')
const User = require('../models/User')
const FaceBelongModel = require('../models/FaceBelongModel')
const Model = require('../models/Model')

module.exports = {

  async GetModel(req, res) {
    const equipmentName = req.body.equipmentName
    const userEmail = req.body.email
    const equipmentId = await Equipment.FindIdByOwnerEmailAndName(userEmail,equipmentName)
    const modelId = await Equipment.FindModelIdByEquipmentId(equipmentId)
    if (! (await Model.IsModelTrain(modelId))) {
      res.send('fail')
    }
    fs.readFile(`./facenetService/models/${modelId}.pkl`, (err, data) => {
      res.send(data)
    })
  },

  async NotifyTrainFinish(req, res){
    if(typeof(req.body.faceIdList) === 'string'){
      faceId = req.body.faceIdList
      faceId = await FaceBelongModel.Add(faceId,req.body.modelId)
    }
    else{
      req.body.faceIdList.forEach(async (faceIdIndex)=>{
        faceId = await FaceBelongModel.Add(faceIdIndex,req.body.modelId)
      })
    }
    await Model.UpdateIsTrainValue(req.body.modelId,true)
    console.log("train finish!")
    res.send("data is receive")
  },

  async CheckModelIsTrain(req, res){
    const equipmentName = req.body.equipmentName
    const userEmail = req.user
    const equipmentId = await Equipment.FindIdByOwnerEmailAndName(userEmail,equipmentName)
    const modelId = await Equipment.FindModelIdByEquipmentId(equipmentId)
    const IsTrain = await Model.IsModelTrain(modelId)
    res.send(IsTrain)
  }
}