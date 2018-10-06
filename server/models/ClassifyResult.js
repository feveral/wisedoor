const db = require('../database/database')
const randomHex = require('randomhex');

module.exports = class ClassifyResult {

    constructor(id, owner) {
        this.id = id
        this.owner = owner
    }

    static async Add(equipmentId) {
        const classifyResultId = await this.ProduceUniqueId()
        const time = this.GetNowTime()
        try {
            await db.query(`insert into CLASSIFY_RESULT VALUES ('${classifyResultId}','${equipmentId}',NULL,'${time}',NULL)`)
            return classifyResultId
        } catch (error) {
            throw new Error('Error occured while executing ClassifyResult.Add')
        }
    }

    static async FindByEquipmentIdAndOffset (equipmentId, page) {
        try {
            const result = await db.query(`select * from CLASSIFY_RESULT where equipmentId='${equipmentId}' order by TIME DESC limit 15 offset ${page*15}`)
            return result
        } catch (error) {
            throw new Error('Error occured while executing ClassifyResult.FindByEquipmentIdAndOffset')
        }
    }

    static async FindPageAmountByEquipmentId (equipmentId) {
        try {
            const result = await db.query(`select COUNT(*) from CLASSIFY_RESULT where equipmentId='${equipmentId}'`)
            return Math.floor(result[0]['COUNT(*)'] / 15) + 1
        } catch (error) {
            throw new Error('Error occured while executing ClassifyResult.FindByEquipmentIdAndOffset')
        }
    }

    static async UpdateFaceNameById (id, faceName, faceRate) {
        try {
            const result = await db.query(`update CLASSIFY_RESULT set FaceName='${faceName}' , FaceRate='${faceRate}' where Id='${id}'`)
            if (result.affectedRows == 0) {
                throw new Error('Error occured while executing ClassifyResult.UpdateFaceNameById : cannot find this equipmentId')
            }
        } catch (error) {
            console.log(error)
            throw new Error('Error occured while executing ClassifyResult.UpdateFaceNameById')
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

    static GetNowTime () {
        const date = new Date()
        const utc = date.getTime() + (date.getTimezoneOffset() * 60000)
        const taipeiDateTime = new Date(utc + (3600000 * 8)).toLocaleString()
        return taipeiDateTime
    }

    // Need to be tested
    static async IsIdExist(id) {
        const result = await db.query(`select Id from CLASSIFY_RESULT where Id='${id}'`)
        return result.length == 1
    }
}