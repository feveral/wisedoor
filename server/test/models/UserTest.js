const User = require('../../models/User')
const db = require('../../database/database')
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

describe('User.IsSignInCorrect', () => {

  const email = 'abcasdewgfr@gmail.com'
  const password = '5566'
  const name = '宗翰'

  before(async () => {
    await User.Add(email, name, password)
  })

  it(`OK`, async () => {
    let response = await User.IsSignInCorrect(email,'5566')
    expect(response).to.equal(true)
    response = await User.IsSignInCorrect(email, '4156413')
    expect(response).to.equal(false)
    response = await User.IsSignInCorrect(email, `1' OR '1'='1`)
    expect(response).to.equal(false)
  })

  it(`Error: duplicated E-mail`, async () => {
    await expect(User.Add('abc@gmail.com', '宗翰', '5566')).to.be.rejectedWith(Error)
  })
})
