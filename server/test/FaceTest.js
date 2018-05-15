const Equipment = require('../models/Equipment')
const User = require('../models/User')
const Face = require('../models/Face')
const db = require('../database/database')

const chai = require('chai')
const assert = chai.assert    // Using Assert style
const expect = chai.expect    // Using Expect style
const should = chai.should()  // Using Should style
chai.use(require('chai-as-promised'))

describe('Face.Add', () => {
  it(`OK`, async () => {
    let response = await Face.Add('宗翰的臉')
    expect(response).to.have.lengthOf(32)
  })
})

describe('Face.FindIsUploadByFaceId', () => {

  it(`OK`, async () => {
    const faceId = await Face.Add('宗翰的臉1')
    const isUpload = await Face.FindIsUploadByFaceId(faceId)
    expect(isUpload).to.equal(false)
  })

  it(`Error: faceId not exists`, async () => {
    await expect(Face.FindIsUploadByFaceId('123')).to.be.rejectedWith(Error)
  })
})

describe('Face.SetIsUpload', () => {

  it(`OK`, async () => {
    const faceId = await Face.Add('宗翰的臉3')
    await Face.setIsUpload(faceId,true)
  })

  it(`Error: faceId not exists`, async () => {
    await expect(Face.setIsUpload('qweqwrf', true)).to.be.rejectedWith(Error)
  })
})