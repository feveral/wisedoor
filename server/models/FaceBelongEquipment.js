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
    const result = await db.query(`select FaceId from FACE_BELONG_EQUIPMENT where EquipmentId='${equipmentId}'`)
    return result
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
                                   Id=FaceId`)
    return result
  }
}