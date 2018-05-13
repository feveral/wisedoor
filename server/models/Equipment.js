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

  static async ProduceUniqueId() {
    const newId = await randomHex(16).substring(2)
    if (await this.IsIdExist(newId)){
      return this.ProduceUniqueId()
    }
    return newId
  }

  static async IsIdExist(id) {
    const result = await db.query(`select Id from EQUIPMENT where Id='${id}'`)
    return result.length == 1
  }

  static async FindEquipmentsByUserEmail(ownerEmail) {
    const result = await db.query(`select * from EQUIPMENT where OwnerEmail='${ownerEmail}'`)
    return result
  }

  static async FindIdByOwnerEmailAndName(ownerEmail, equipmentName) {
    const result = await db.query(`select Id from EQUIPMENT where OwnerEmail='${ownerEmail}' AND Name='${equipmentName}'`)
    return result[0].Id
  }
}