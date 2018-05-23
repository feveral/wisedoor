const Equipment = require('../../models/Equipment')
const User = require('../../models/User')
const db = require('../../database/database')

const chai = require('chai')
const assert = chai.assert    // Using Assert style
const expect = chai.expect    // Using Expect style
const should = chai.should()  // Using Should style
chai.use(require('chai-as-promised'))

describe('Equipment.Add', () => {

  before(async () => {
    await User.Add('locker@gmail.com', '宗翰', '5566')
  })

  it(`OK`, async () => {
    let response =  await Equipment.Add('locker@gmail.com','我的家')
    expect(response).to.have.lengthOf(32)
  })

  it(`Error: doesn't have this email`, async () => {
    await expect(Equipment.Add('locker123@gmail.com', '我的家')).to.be.rejectedWith(Error)
  })
})

describe('Equipment.FindEquipmentsByUserEmail',  () =>  {

  before( async () => {
    await User.Add('locker45688@gmail.com', '宗翰', '5566')
    await Equipment.Add('locker45688@gmail.com', '我的家')
  })

  it(`OK`, async () => {
    const response = await Equipment.FindEquipmentsByUserEmail('locker45688@gmail.com')
    expect(response[0].Name).to.equal('我的家')
  })

  it(`Error: email doesn't exists`, async () => {
    await expect(Equipment.FindEquipmentsByUserEmail('no_this_email@gmail.com')).to.be.rejectedWith(Error)
  })
  
  after( () => {

  })
})

describe('Equipment.FindIdByOwnerEmailAndName', () => {

  let equipmentId
  before(async () => {
    await User.Add('hnqouiwrde@gmail.com', '宗翰', '5566')
    equipmentId = await Equipment.Add('hnqouiwrde@gmail.com', '我的家')
  })

  it(`OK`, async () => {
    const Id = await Equipment.FindIdByOwnerEmailAndName('hnqouiwrde@gmail.com','我的家')
    expect(Id).to.equal(equipmentId)
  })

  it(`Error: email doesn't exists`, async () => {
    await expect(Equipment.FindIdByOwnerEmailAndName('no_this_email@gmail.com', '我的家')).to.be.rejectedWith(Error)
  })

  it(`Error: cannot find this Equipment Name`, async () => {
    await expect(Equipment.FindIdByOwnerEmailAndName('hnqouiwrde@gmail.com', '不是我的家')).to.be.rejectedWith(Error)
  })

  after(() => {

  })
})

describe('Equipment.FindModelIdByEquipmentId', () => {

  let equipmentId
  before(async () => {
    await User.Add('locker213@gmail.com', '宗翰', '5566')
    equipmentId = await Equipment.Add('locker213@gmail.com', '我的家2')
    await Equipment.UpdateModelIdByEquipmentId(equipmentId,'123456789')
  })

  it(`OK`, async () => {
    const modelId = await Equipment.FindModelIdByEquipmentId(equipmentId)
    expect(modelId).to.be.equal('123456789')
  })

  it(`Error : EquipmentId not exists`, async () => {
    await expect(Equipment.FindModelIdByEquipmentId('123')).to.be.rejectedWith(Error)
  })

  after(() => {
  })
})

describe('Equipment.UpdateModelIdByEquipmentId', () => {

  let equipmentId
  before(async () => {
    equipmentId = await Equipment.Add('locker@gmail.com', '我的家2')
  })

  it(`OK`, async () => {
    await Equipment.UpdateModelIdByEquipmentId(equipmentId, 'asdzdcxv41564')
  })

  it(`Error : equipmentId doesn't exists`, async () => {
    await expect(Equipment.UpdateModelIdByEquipmentId(`this equipmentId doesn't exists`, 'asdzdcxv41564')).to.be.rejectedWith(Error)
  })

  after(() => {
  })
})