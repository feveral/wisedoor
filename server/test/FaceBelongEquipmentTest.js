const FaceBelongEquipment = require('../models/FaceBelongEquipment')
const Equipment = require('../models/Equipment')
const Face = require('../models/Face')
const User = require('../models/User')
const db = require('../database/database')

const chai = require('chai')
const assert = chai.assert    // Using Assert style
const expect = chai.expect    // Using Expect style
const should = chai.should()  // Using Should style
chai.use(require('chai-as-promised'))

describe('FaceBelongEquipment.Add', () => {
  let equipmentId
  let faceId
  before( async () => {
    await User.Add('ppap@gmail.com', '宗翰', '5566')
    equipmentId = await Equipment.Add('ppap@gmail.com','我的家')
    faceId = await Face.Add('宗翰的臉',false)
  })

  it(`OK`, async () => {
    await FaceBelongEquipment.Add(faceId,equipmentId)
  })
  
  it('Error', async () => {
    await expect(FaceBelongEquipment.Add('123', '456')).to.be.rejectedWith(Error)
  })

  after(() => {
    
  })
})


describe('FaceBelongEquipment.FindFaceIdByEquipmentId', () => {
  before( () => {
  })

  it(`OK`, async () => {
  })

  it('error', () => {
  })

  after(() => {
  })
})
