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
      modelId = await Model.Add()
    })
  
    it(`OK`, async () => {
      faceBelongModel = await FaceBelongModel.Add(faceId,modelId)
    })
    
    it('Error', async () => {
    })
  
    after(() => {
      
    })
  })