const db = require('../database/database')
const randomHex = require('randomhex')

module.exports = class FaceBelongModel {

  constructor(faceId, modelId) {
    this.faceId = faceId
    this.modelId = modelId
  }

  static async Add(faceId, modelId) {
    await db.query(`insert into FACE_BELONG_MODEL VALUES ('${faceId}','${modelId}')`)
    return faceId
  }
}