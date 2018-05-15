const User = require('../models/User')
const db = require('../database/database')
const chai = require('chai')
const assert = chai.assert    // Using Assert style
const expect = chai.expect    // Using Expect style
const should = chai.should()  // Using Should style
chai.use(require('chai-as-promised'))


describe('User.Add', () => {

  it(`OK`, async () => {
    await User.Add('abc@gmail.com', '宗翰', '5566')
  })

  it(`Error: duplicated E-mail`, async () => {
    await expect(User.Add('abc@gmail.com', '宗翰', '5566')).to.be.rejectedWith(Error)
  })
})

