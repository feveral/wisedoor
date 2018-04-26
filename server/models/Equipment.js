const db = require('../database/database')
const randomHex = require('randomhex');

module.exports = class Equipment {

  constructor(id, owner) {
    this.id = id
    this.owner = owner
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

  static async FindIdByOwnerEmailAndName(ownerEmail, equipmentName) {
    const result = await db.query(`select Id from EQUIPMENT where OwnerEmail='${ownerEmail}' AND Name='${equipmentName}'`)
    return result[0].Id
  }
}