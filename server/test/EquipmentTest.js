const assert = require('assert')
const Equipment = require('../models/Equipment')
const User = require('../models/User')
const db = require('../database/database')
/*
describe('Equipment.Add', () => {

  before(() => {

  })

  it(`OK`, async () => {
    const response = await Equipment.Add('abc@gmail.com','我的家')
    assert.deepEqual(response, [])
  })

  after(() => {
    //db.end()
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

*/