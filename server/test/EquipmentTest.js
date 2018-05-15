const Equipment = require('../models/Equipment')
const User = require('../models/User')
const db = require('../database/database')

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
    await Equipment.Add('locker@gmail.com','我的家')
  })

  it(`Error: doesn't have this email`, async () => {
    await expect(Equipment.Add('locker123@gmail.com', '我的家')).to.be.rejectedWith(Error)
  })
})


describe('Equipment.FindEquipmentsByUserEmail',  () =>  {
  it(`email doesn't exists`, async () => {
    const response = await Equipment.FindEquipmentsByUserEmail('no this email')
    assert.deepEqual(response,[])
  })
  
  after( () => {
    //db.end()
  })
})

describe('Equipment.UpdateModelIdByEquipmentId',  () =>  {

  before(async () => {
    equipmentId = await Equipment.Add('locker@gmail.com','我的家2')
  })

  it(`OK`, async () => {
    await Equipment.UpdateModelIdByEquipmentId(equipmentId,333)
  })

  after( () => {
    //db.end()
  })
})


