const FaceBelongEquipment = require('../../models/FaceBelongEquipment')
const FaceBelongModel = require('../../models/FaceBelongModel')
const Equipment = require('../../models/Equipment')
const Face = require('../../models/Face')
const User = require('../../models/User')
const Model = require('../../models/Model')
const db = require('../../database/database')


const chai = require('chai')
const assert = chai.assert    // Using Assert style
const expect = chai.expect    // Using Expect style
const should = chai.should()  // Using Should style
chai.use(require('chai-as-promised'))


describe('FaceBelongModel.Add', () => {
    let equipmentId
    let modelId
    before( async () => {
        equipmentId = await Equipment.Add('ppap@gmail.com','我的家')
        faceId = await Face.Add('宗翰的臉',false)
    })

    it(`OK`, async () => {
        modelId = await Model.Add()
    })

    it('Error', async () => {
    })

    after(() => {
        
    })
})

describe('FaceBelongModel.UpdateIsTrainValue', () => {
    let equipmentId
    let modelId
    before( async () => {
        modelId = await Model.Add()
    })

    it(`OK`, async () => {
        await Model.UpdateIsTrainValue(modelId,true)
    })

    it('Error : modelId cannot find', async () => {
        await expect(Model.UpdateIsTrainValue(555,true)).to.be.rejectedWith(Error)
    })

    after(() => {
        
    })
})