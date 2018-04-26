const db = require('../database/database')
const randomHex = require('randomhex');

module.exports = class Face {

  constructor(faceId, equipmentId) {
    this.faceId = faceId
    this.equipmentId = equipmentId
  }

  static async Add(faceId, equipmentId) {
    await db.query(`insert into FACE_BELONG_EQUIPMENT VALUES ('${faceId}','${equipmentId}')`)
    return
  }
}