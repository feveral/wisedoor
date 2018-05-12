const assert = require('assert')
const Equipment = require('../models/Equipment')
const db = require('../database/database')

describe('FindEquipmentsByUserEmail',  () =>  {
  it(`email doesn't exists`, async () => {
    const response = await Equipment.FindEquipmentsByUserEmail('no this email')
    assert.deepEqual(response,[])
  })

  it('should sub numbers', () => {
    const response = await Equipment.FindEquipmentsByUserEmail('no this email')
    assert.deepEqual(response, [])
  })
  
  after( () => {
    db.end()
  })
})