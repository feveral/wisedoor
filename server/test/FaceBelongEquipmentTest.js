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
  let equipmentId
  let faceId
  before( async() => {
    equipmentId = await Equipment.Add('ppap@gmail.com','我的家2')
    faceId = await Face.Add('屁孩的臉',false)
    await FaceBelongEquipment.Add(faceId,equipmentId)
  })

  it(`OK`, async () => {
    const faceIds = await FaceBelongEquipment.FindFaceIdByEquipmentId(equipmentId)
    expect(faceIds[0]["FaceId"]).to.equal(faceId);
  })

  it('Error', async () => {

  })

  after(() => {
  })
})

describe('FaceBelongEquipment.FindFaceIdNamePairByEquipmentId', () => {
  let equipmentId
  let faceId1
  let faceId2
  before(async () => {
    equipmentId = await Equipment.Add('ppap@gmail.com', '我的家2222')
    faceId1 = await Face.Add('屁孩的臉123', false)
    faceId2 = await Face.Add('屁孩的臉1234', false)
    await FaceBelongEquipment.Add(faceId1, equipmentId)
    await FaceBelongEquipment.Add(faceId2, equipmentId)
  })

  it(`OK`, async () => {
    const facePairs = await FaceBelongEquipment.FindFaceIdNamePairByEquipmentId(equipmentId)
    let correctPairs = {}
    correctPairs[faceId1] = '屁孩的臉123'
    correctPairs[faceId2] = '屁孩的臉1234'
    expect(facePairs).to.deep.equal(correctPairs)
  })

  it('Error', async () => {

  })

  after(() => {
    
  })
})
