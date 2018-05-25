const db = require('../database/database')
const randomHex = require('randomhex')

module.exports = class Model {

  constructor(id, email, name) {
    this.id = id
    this.time = time
    this.equipmentId = equipmentId
  }

  static async Add() {
    const modelId = await this.ProduceUniqueId()
    await db.query(`insert into MODEL VALUES ('${modelId}', false)`)
    return modelId
  }

  static async UpdateIsTrainValue(modelId,isTrainValue) {
    try{
      const response = await db.query(`update MODEL SET IsTrain = ${isTrainValue} WHERE Id='${modelId}'`)
      if(response.affectedRows == 0)
        throw new Error('Error occured while executing Model.UpdateIsrainValue : cannot find modelId')
    } catch (error) {
      throw new Error('Error occured while executing Model.UpdateIsrainValue')
    }
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

  static async IsModelTrain(id){
    try{
      const result = await db.query(`select IsTrain from MODEL where Id='${id}'`)
      return result[0].IsTrain == 1
    } catch (error) {
      throw new Error('Error occured while executing Model.IsModelTrain')
    }
  }

}