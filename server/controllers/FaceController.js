const Face = require('../models/Face')
const FaceBelongEquipment = require('../models/FaceBelongEquipment')
const FaceBelongModel = require('../models/FaceBelongModel')
const Equipment = require('../models/Equipment')
const Model = require('../models/Model')
const modelBasePath = `${process.cwd()}/facenetService/models`
const request = require('request');
const fs = require('fs');
const rimraf = require('rimraf');

module.exports = {

  async GetFaces(req, res) {
    const equipmentId = req.params.equipmentId 
    const faces = await FaceBelongEquipment.FindFacesByEquipmentId(equipmentId)
    res.send(faces)
  },

  async DeleteFace(req, res, next) {
    const equipmentId = req.body.equipmentId 
    const faceId = req.body.faceId 
    const deleteFaceInEquipmentresult = await FaceBelongEquipment.DeleteFaceByEquipmentId(faceId,equipmentId)
    req.modelId = await Equipment.FindModelIdByEquipmentId(equipmentId)
    const deleteFaceInModelresult = await FaceBelongModel.Delete(faceId,req.modelId)

    await Face.Delete(req.body.faceId)
    fs.unlink(`${process.cwd()}/facenetService/models/faces/${req.body.faceId }.pkl`, (err) => {
        if (err) throw err;
    });
    rimraf(`${process.cwd()}/facenetService/image/cut/${req.body.faceId }`, (err) => {
        if (err) throw err;
    });
    rimraf(`${process.cwd()}/facenetService/image/raw/${req.body.faceId }`, (err) => {
        if (err) throw err;
    });
    next()
  },

  async ReTrainModel(req, res, next){
    faceIdNamePairs = await FaceBelongEquipment.FindFaceIdNamePairByEquipmentId(req.body.equipmentId)
    if(Object.keys(faceIdNamePairs).length > 0){
        await Model.UpdateIsTrainValue(req.modelId,0)
        const formData =
        {
            "faceIdNamePairs": JSON.stringify(faceIdNamePairs),
            "outputBasePath": modelBasePath,
            "modelId": req.modelId,
        }
    
        request.post({ url: 'http://localhost:3000/retrain', formData: formData }
            , async (error, response, body) => {
                if (!error && response.statusCode == 200) {
                    console.log("retraining")
                }
                else {
                    console.log("error" + error)
                    res.send({ error: "An error occured while retraining model" })
                }
            }
        )
        await Model.UpdateIsTrainValue(req.modelId,1)
    }
    else{
        await Equipment.UpdateModelIdByEquipmentId(req.body.equipmentId,"null")
        Model.DeleteModelByModelId(req.modelId)
        fs.unlink(`${process.cwd()}/facenetService/models/${req.modelId}.pkl`, (err) => {
            if (err) throw err;
            console.log('successfully delete ' +  `${req.modelId}` + '.pkl');
        });
    }
    res.send({ success: true })
  }
  
}