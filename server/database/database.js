const config = require('../config/config')
const util = require('util')
const db = require('mysql').createPool(config.db_config)

db.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Database connection was closed.')
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('Database has too many connections.')
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('Database connection was refused.')
    }
    if (connection) connection.release()
    return
  }
})

/* 讓 db.query() 可以使用 async/await */
db.query = util.promisify(db.query)
module.exports = db