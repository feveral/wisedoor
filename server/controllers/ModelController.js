var fs = require('fs');
const Equipment = require('../models/Equipment')
const FaceBelongModel = require('../models/FaceBelongModel')
const Model = require('../models/Model')

module.exports = {
  GetNewModel(req, res) {
    fs.readFile("./facenetTrain/models/tom_strength_classifier.pkl", (err, data)=>{
      res.send(data);
    });      
  },

  async NotifyTrainFinish(req, res){
    await Equipment.UpdateModelIdByEquipmentId(req.body.equipmentId,req.body.modelId)
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
    
    res.send("data is receive")
  }
}