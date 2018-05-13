const db = require('../database/database')

module.exports = class User{ 

  constructor (id,email,name) {
    this.id = id
    this.name = name
    this.email = email
    this.password = password
  }

  static async Add(email, name, password) {
    try {
      await db.query(`insert into USER VALUES ('${email}','${name}','${password}')`)
    } 
    catch (error) {
      throw new Error('Error occured while executing User.Add')
    }
  }

  static async IsSignInCorrect (email, password, callback) {
    const result = await db.query(`select * from USER where Email='${email}' AND Password='${password}'`)
    return result.length == 1
  }

  static async findNameByEmail (email){
    const result = await db.query(`select Name from USER where Email='${email}'`)
    return result[0].Name
  }
}