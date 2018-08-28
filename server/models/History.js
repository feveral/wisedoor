const db = require('../database/database')
const randomHex = require('randomhex')

module.exports = class History {

    constructor(id, equipmentId, faceId, openTime) {
        this.id = id
        this.equipmentId = equipmentId
        this.faceId = faceId
        this.openTime = openTime
    }

    static async Add(equipmentId, faceId, openTime, doorState, openDoorType) {
        const historyId = await this.ProduceUniqueId()
        try {
            await db.query(`insert into HISTORY VALUES ('${historyId}','${equipmentId}','${faceId}','${openTime}','${doorState}','${openDoorType}')`)
            return historyId
        } catch (error) {
            console.log(error)
            throw new Error('Error occured while executing History.Add')
        }
    }

    // Need to be tested
    static async ProduceUniqueId() {
        const newId = await randomHex(16).substring(2)
        if (await this.IsIdExist(newId)) {
            return this.ProduceUniqueId()
        }
        return newId
    }

    // Need to be tested
    static async IsIdExist(id) {
        const result = await db.query(`select Id from HISTORY where Id='${id}'`)
        return result.length == 1
    }

    static async FindIsUploadByFaceId(faceId) {
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

    static async FindDataByEquipmentId(equipmentId) {
        try {
            const response = await db.query(`select * from HISTORY where EquipmentId='${equipmentId}'`)
            return response
        } catch (error) {
            throw new Error('Error occured while executing History.FindDataByEquipmentId')
        }
    }
}