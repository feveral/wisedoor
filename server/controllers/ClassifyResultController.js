const ClassifyResult = require('../models/ClassifyResult')
const Equipment = require('../models/Equipment')
const fs = require("fs")

module.exports = {

    async getClassifyResult (req, res) {
        const page = req.params.page 
        const equipmentName = req.params.equipmentName
        const equipmentId = await Equipment.FindIdByOwnerEmailAndName(req.user, equipmentName)
        let result = await ClassifyResult.FindByEquipmentIdAndOffset(equipmentId,page)
        result = JSON.parse(JSON.stringify(result))
        
        for (let index = 0; index < result.length; index++) {
            let data
            try{
                data = fs.readFileSync("./facenetService/image/classify_result/cut/" + `${result[index]["Id"]}.png`)
            }
            catch(error){
                data = fs.readFileSync(`./facenetService/image/no_pic.jpeg`)
            }
            base64Image = new Buffer(data, 'binary').toString('base64')
            result[index]['FaceImage'] = base64Image
            result[index]['Time'] = module.exports.setTimeCorrect(result[index]['Time'])
        }
        res.send(result)
    },

    async getPageAmount (req, res) {
        const equipmentName = req.params.equipmentName
        const equipmentId = await Equipment.FindIdByOwnerEmailAndName(req.user, equipmentName)
        const amount = (await ClassifyResult.FindPageAmountByEquipmentId(equipmentId))
        res.status(200).send({amount:amount})
    },


    setTimeCorrect (time) {
        date = time.split("T")[0]
        hour = (parseInt(time.split("T")[1].split(":")[0]) + 8).toString()
        minute = parseInt(time.split("T")[1].split(":")[1])
        second = parseInt(time.split("T")[1].split(":")[2])
        time = date + " " +  module.exports.isNumberTwoBit(hour) + ":" + module.exports.isNumberTwoBit(minute) + ":" + module.exports.isNumberTwoBit(second)
        return time
    },

    isNumberTwoBit (number) {
        if(number < 10){
            return "0" + number 
        }
        return number
    },
}