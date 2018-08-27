/*
  Need To Be Test : 
    IsFaceNameInEquipment
    FindFaceIdByFaceNameAndEquipmentId
    FindFaceById
    FindNameById
    ProduceUniqueId
    IsIdExist
*/

const db = require('../database/database')
const randomHex = require('randomhex')

module.exports = class Face {

  constructor (id, name) {
    this.id = id
    this.name = name
  }

  static async Add (name) {
    const faceId = await this.ProduceUniqueId()
    try {
      await db.query(`insert into FACE VALUES ('${faceId}','${name}',false)`)
      return faceId
    } catch (error) {
      throw new Error('Error occured while executing Face.Add')
    }
  }

  static async Delete (faceId) {
    try {
      await db.query(`delete from FACE where id = '${faceId}'`)
      return faceId
    } catch (error) {
      throw new Error('Error occured while executing Face.Delete')
    }
  }

  static async FindIsUploadByFaceId (faceId) {
    try {
      const response = await db.query(`select IsUpload from FACE where Id='${faceId}'`)
      if (response.length == 0) {
        throw new Error('Error occured while executing Face.FindIsUploadByFaceId : faceId not exists')
      }
      return response[0].IsUpload != 0
    } catch (error) {
      throw new Error('Error occured while executing Face.FindIsUploadByFaceId')      
    }
  }

  static async updateIsUpload (faceId, isUpload) {
    try {
      const response = await db.query(`update FACE set IsUpload=${isUpload} where Id='${faceId}'`)
      if (response.affectedRows == 0) {
        throw new Error('Error occured while executing Face.setIsUpload : faceId not exists')
      } 
    } catch (error) {
      throw new Error('Error occured while executing Face.setIsUpload')
    }
  }

  // Need to be tested
  static async ProduceUniqueId () {
    const newId = await randomHex(16).substring(2)
    if (await this.IsIdExist(newId)) {
      return this.ProduceUniqueId()
    }
    return newId
  }
  
  // Need to be tested
  static async IsIdExist(id) {
    const result = await db.query(`select Id from FACE where Id='${id}'`)
    return result.length == 1
  }

  // Need to be tested
  static async IsFaceNameInEquipment (faceName, equipmentId) {
    try {
      const result = await db.query(`select * from FACE,FACE_BELONG_EQUIPMENT 
                                      where EquipmentId='${equipmentId}' AND
                                      FaceId=Id AND
                                      Name='${faceName}'`)
      return result.length == 1
    } catch (error) {
      throw new Error('Error occured while executing Face.IsFaceNameInEquipment')
    }
  }
  
  // Need to be tested
  static async FindFaceIdByFaceNameAndEquipmentId(faceName, equipmentId) {
    const result = await db.query(`select Id from FACE,FACE_BELONG_EQUIPMENT 
                                    where EquipmentId='${equipmentId}' AND
                                    FaceId=FACE.Id AND
                                    FACE.Name='${faceName}'`)
    return result[0].Id
  }

  static async FindFaceById(id) {
    const result = await db.query(`select * from FACE where Id='${id}'`)
    return result
  }

  static async FindNameById(id) {
    const result = await db.query(`select Name from FACE where Id='${id}'`)
    return result[0].Name
  }
}