const db = require('../database/database')

module.exports = class Model {

  constructor(id, email, name) {
    this.id = id
    this.time = time
    this.equipmentId = equipmentId
  }

  static async Add(id, time, equipmentId) {
    const modelId = await this.ProduceUniqueId()
    await db.query(`insert into MODEL VALUES ('${id}','${time}','${equipmentId}')`)
    return modelId
  }

  static async ProduceUniqueId() {
    const newId = await randomHex(16).substring(2)
    if (await this.IsIdExist(newId)) {
      return this.ProduceUniqueId()
    }
    return newId
  }

  static async IsIdExist(id) {
    const result = await db.query(`select Id from MODEL where Id='${id}'`)
    return result.length == 1
  }
}