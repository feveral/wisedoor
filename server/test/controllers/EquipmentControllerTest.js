const User = require('../../models/User')
const Equipment = require('../../models/Equipment')
const EquipmentController = require('../../controllers/EquipmentController')
const db = require('../../database/database')

const httpMocks = require('node-mocks-http')
const chai = require('chai')
const assert = chai.assert    // Using Assert style
const expect = chai.expect    // Using Expect style
const should = chai.should()  // Using Should style
chai.use(require('chai-as-promised'))

describe('EquipmentController.register', () => {

  before(async () => {
    await User.Add('asnmb@gmail.com', '宗翰', '5566')
  })

  it(`OK`, async () => {
    let req = httpMocks.createRequest()
    let res = httpMocks.createResponse()
    req.user = 'asnmb@gmail.com'
    req.body = {
      equipmentName: '我的設備'
    }
    await EquipmentController.register(req, res)
    expect(res.statusCode).to.equal(200)
    expect(res._getData()).to.deep.equal({ success: 'Add equipmemt successfully' })
  })

  it(`Error: User not Login`, async () => {
    let req = httpMocks.createRequest()
    let res = httpMocks.createResponse()
    req.user = undefined
    req.body = {
      equipmentName: '我的設備'
    }
    await EquipmentController.register(req, res)
    expect(res.statusCode).to.equal(500)
    expect(res._getData()).to.deep.equal({ error: 'register equipment error' })
  })
})
