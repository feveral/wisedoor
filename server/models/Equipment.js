const db = require('../database/database')
const randomHex = require('randomhex');

module.exports = class Equipment {

  constructor(id, owner) {
    this.id = id
    this.owner = owner
  }

  static async Add (ownerEmail,name) {
    const equipmentId = await this.ProduceUniqueId()
    try {
      await db.query(`insert into EQUIPMENT VALUES ('${equipmentId}','${ownerEmail}','${name}',null,false)`)
      return equipmentId
    } catch (error) {
      throw new Error('Error occured while executing Equipment.Add')
    }
  }

  // Need to be tested
  static async ProduceUniqueId() {
    const newId = await randomHex(16).substring(2)
    if (await this.IsIdExist(newId)){
      return this.ProduceUniqueId()
    }
    return newId
  }

  // Need to be tested
  static async IsIdExist(id) {
    const result = await db.query(`select Id from EQUIPMENT where Id='${id}'`)
    return result.length == 1
  }

  static async FindEquipmentsByUserEmail(ownerEmail) {
    try {
      const result = await db.query(`select * from EQUIPMENT where OwnerEmail='${ownerEmail}'`)
      if (result.length == 0) {
        throw new Error('Error occured while executing Equipment.FindEquipmentsByUserEmail : OwnerEmail Cannot be found') 
      }
      return result
    } catch (error) {
      throw new Error('Error occured while executing Equipment.FindEquipmentsByUserEmail') 
    }
  }

  static async FindIdByOwnerEmailAndName(ownerEmail, equipmentName) {
    try {
      const result = await db.query(`select Id from EQUIPMENT where OwnerEmail='${ownerEmail}' AND Name='${equipmentName}'`)
      return result[0].Id
    } catch (error) {
      console.log(error)
      throw new Error('Error occured while executing Equipment.FindIdByOwnerEmailAndName') 
    } 
  }

  static async FindModelIdByEquipmentId (equipmentId) {
    try {
      const result = await db.query(`select ModelId from EQUIPMENT where Id='${equipmentId}'`)
      return result[0].ModelId
    } catch (error) {
      throw new Error('Error occured while executing Equipment.FindModelIdByEquipmentId') 
    }
  }

  static async UpdateModelIdByEquipmentId(equipmentId,newModelId){
    let result;
    try {
      if(newModelId != "null"){
        result = await db.query(`update EQUIPMENT set ModelId='${newModelId}' where Id='${equipmentId}'`)
      }
      else{
        result = await db.query(`update EQUIPMENT set ModelId=NULL where Id='${equipmentId}'`)
      }
      if (result.affectedRows == 0) {
        throw new Error('Error occured while executing Equipment.FindModelIdByEquipmentId : cannot find this equipmentId') 
      }
    } catch (error) {
      console.log(error)
      throw new Error('Error occured while executing Equipment.FindModelIdByEquipmentId') 
    }
  }

  static async UpdatePasswordByEquipmentId(equipmentId,password){
    try {
      const result = await db.query(`update EQUIPMENT set Password='${password}' where Id='${equipmentId}'`)
      if (result.affectedRows == 0) {
        throw new Error('Error occured while executing Equipment.UpdatePasswordByEquipmentId : cannot find this equipmentId') 
      }
    } catch (error) {
      throw new Error('Error occured while executing Equipment.UpdatePasswordByEquipmentId') 
    }
  }

  static async FindPasswordByEquipmentId(equipmentId){
    try {
      const result = await db.query(`select Password from EQUIPMENT where Id='${equipmentId}'`)
      return result[0].Password
      if (result.affectedRows == 0) {
        throw new Error('Error occured while executing Equipment.FindPasswordByEquipmentId : cannot find this equipmentId') 
      }
    } catch (error) {
      throw new Error('Error occured while executing Equipment.FindPasswordByEquipmentId') 
    }
  }
}