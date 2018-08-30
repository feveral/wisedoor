const db = require('../database/database')
const randomHex = require('randomhex')

module.exports = class FaceBelongEquipment {

  constructor(faceId, equipmentId) {
    this.faceId = faceId
    this.equipmentId = equipmentId
  }

  static async Add (faceId, equipmentId) {
    try {
      await db.query(`insert into FACE_BELONG_EQUIPMENT VALUES ('${faceId}','${equipmentId}')`)
    } 
    catch (error) {
      throw new Error('Error occured while executing FaceBelongEquipment.Add')
    }
  }

  static async FindFaceIdByEquipmentId (equipmentId) {
    try{
      const result = await db.query(`select FaceId from FACE_BELONG_EQUIPMENT where EquipmentId='${equipmentId}'`)
      return result
    }
    catch (error){
      throw new Error('Error occured while executing FaceBelongEquipment.FindFaceIdByEquipmentId')
    }
  }

  static async FindFaceIdNamePairByEquipmentId (equipmentId) {
    try {
      const result = await db.query(`select FACE.Id,FACE.Name from FACE_BELONG_EQUIPMENT,FACE 
                                        where EquipmentId='${equipmentId}' AND
                                        FACE.Id = FaceId AND IsUpload=1`)
      let pairs = {}
      result.forEach(element => {
        pairs[element.Id] = element.Name
      })
      return pairs
    }
    catch (error) {
      throw new Error('Error occured while executing FaceBelongEquipment.FindFacesByEquipmentId')
    }
  }

  static async FindEquipmentIdByFaceId (faceId) {
    const result = await db.query(`select EquipmentId from FACE_BELONG_EQUIPMENT where FaceId='${faceId}'`)
    return result
  }

  static async FindEquipmentsByFaceId(faceId) {
    // TODO
  }

  static async FindFacesByEquipmentId(equipmentId) {
    const result = await db.query(`select FACE.Id,FACE.Name 
                                   from FACE,FACE_BELONG_EQUIPMENT 
                                   where EquipmentId='${equipmentId}' AND
                                   Id=FaceId AND IsUpload=1`)
    return result
  }

  static async DeleteFaceByEquipmentId(faceId,equipmentId){
    const result = await db.query(`delete from FACE_BELONG_EQUIPMENT 
                                   where EquipmentId='${equipmentId}' AND
                                   FaceId='${faceId}'`)
    return result
  }
}