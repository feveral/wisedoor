const config = require('../config/config')
delete config.db_config.database
const db = require('mysql').createConnection(config.db_config)

db.query('DROP DATABASE IF EXISTS Wisedoor;')
db.query('CREATE DATABASE Wisedoor;')
db.query('USE Wisedoor;')
db.query('DROP TABLE IF EXISTS USER;')
db.query('DROP TABLE IF EXISTS EQUIPMENT;')
db.query('DROP TABLE IF EXISTS FACE;')
db.query('DROP TABLE IF EXISTS MODEL;')
db.query('DROP TABLE IF EXISTS FACE_BELONG_MODEL;')
db.query('DROP TABLE IF EXISTS FACE_BELONG_EQUIPMENT;')
db.query(
    `CREATE TABLE USER
     (
       Email VARCHAR(255) CHARACTER SET utf8 NOT NULL ,  
       Name VARCHAR(255) CHARACTER SET utf8 NOT NULL ,  
       Password VARCHAR(255) CHARACTER SET utf8 NOT NULL ,  
       PRIMARY KEY(Email)
     );`
  )
  
db.query(
    `CREATE TABLE EQUIPMENT
     (
       Id VARCHAR(255) CHARACTER SET utf8 NOT NULL ,
       OwnerEmail VARCHAR(255) CHARACTER SET utf8 NOT NULL ,
       Password VARCHAR(255) CHARACTER SET utf8 NOT NULL ,  
       Name VARCHAR(255) CHARACTER SET utf8 NOT NULL , 
       ModelId VARCHAR(255) CHARACTER SET utf8 , 
       IsTrain BOOLEAN NOT NULL , 
       PRIMARY KEY(Id) , 
       FOREIGN KEY(OwnerEmail) REFERENCES USER(Email)
     );`
  )
  
db.query(
    `CREATE TABLE FACE
     (
       Id VARCHAR(255) CHARACTER SET utf8 NOT NULL , 
       Name VARCHAR(255) CHARACTER SET utf8 NOT NULL , 
       IsUpload BOOLEAN NOT NULL , 
       PRIMARY KEY(Id)  
     );`
  )
  
db.query(
    `CREATE TABLE MODEL
     (
       Id VARCHAR(255) CHARACTER SET utf8 NOT NULL ,
       IsTrain BOOLEAN NOT NULL , 
       PRIMARY KEY(Id) 
     );`
  )

db.query(
  `CREATE TABLE HISTORY
     (
       Id VARCHAR(255) CHARACTER SET utf8 NOT NULL,
       EquipmentId VARCHAR(255) CHARACTER SET utf8 NOT NULL ,
       FaceId VARCHAR(255) CHARACTER SET utf8 NOT NULL,
       OpenTime DATETIME NOT NULL,
       DoorState VARCHAR(255) CHARACTER SET utf8 NOT NULL,
       OpenDoorType VARCHAR(255) CHARACTER SET utf8 NOT NULL,
       PRIMARY KEY(Id),
       FOREIGN KEY(EquipmentId) REFERENCES EQUIPMENT(Id)
     );`
)
  
db.query(
    `CREATE TABLE FACE_BELONG_MODEL
     (
       FaceId VARCHAR(255) CHARACTER SET utf8 NOT NULL ,
       ModelId VARCHAR(255) CHARACTER SET utf8 NOT NULL , 
       PRIMARY KEY(FaceId,ModelId) , 
       FOREIGN KEY(FaceId) REFERENCES FACE(Id),
       FOREIGN KEY(ModelId) REFERENCES MODEL(Id)
     );`
  )
  
db.query(
    `CREATE TABLE FACE_BELONG_EQUIPMENT
     (
       FaceId VARCHAR(255) CHARACTER SET utf8 NOT NULL ,
       EquipmentId VARCHAR(255) CHARACTER SET utf8 NOT NULL , 
       PRIMARY KEY(FaceId,EquipmentId) , 
       FOREIGN KEY(FaceId) REFERENCES FACE(Id),
       FOREIGN KEY(EquipmentId) REFERENCES EQUIPMENT(Id)
     );`
  )

db.query(
    `CREATE TABLE CLASSIFY_RESULT
     (
       Id VARCHAR(255) CHARACTER SET utf8 NOT NULL ,
       EquipmentId VARCHAR(255) CHARACTER SET utf8 NOT NULL ,
       FaceName VARCHAR(255) CHARACTER SET utf8,
       Time DATETIME NOT NULL,
       PRIMARY KEY(Id) ,
       FOREIGN KEY(EquipmentId) REFERENCES EQUIPMENT(Id)
     );`
)

db.query(`insert into USER VALUES('feveraly@gmail.com','宗翰','5566');`)
db.query(`insert into USER VALUES('john@gmail.com','忠禮','5566');`)
db.query(`insert into EQUIPMENT VALUES('259c7ae134d7ffe7f58fb5fda3561b68','feveraly@gmail.com',5678,'家裡的門',NULL,false);`)
db.query(`insert into EQUIPMENT VALUES('259c7ae134d7ffe7f58fb5fda35bbbb8','feveraly@gmail.com',8888,'公司的門',NULL,false);`)
db.end()

if (!require('fs').existsSync('facenetService/image/raw')) {
  require('fs').mkdirSync('facenetService/image/raw')
}

if (!require('fs').existsSync('facenetService/image/cut')) {
  require('fs').mkdirSync('facenetService/image/cut')
}

if (!require('fs').existsSync('facenetService/image/classify_result/raw')) {
  require('fs').mkdirSync('facenetService/image/classify_result/raw')
}

if (!require('fs').existsSync('facenetService/image/classify_result/cut')) {
  require('fs').mkdirSync('facenetService/image/classify_result/cut')
}

if (!require('fs').existsSync('facenetService/models')) {
  require('fs').mkdirSync('facenetService/models')
}

if (!require('fs').existsSync('facenetService/image/history')) {
  require('fs').mkdirSync('facenetService/image/history')
}
  
require('fs').readdir('facenetService/image/raw', (err, files) => {
  for(let i = 0 ; i < files.length ; i++)
    require('rimraf')(`facenetService/image/raw/${files[i]}`,()=>{})
})

require('fs').readdir('facenetService/image/cut', (err, files) => {
  for(let i = 0 ; i < files.length ; i++)
    require('rimraf')(`facenetService/image/cut/${files[i]}`,()=>{})
})

require('fs').readdir('facenetService/image/classify_result/raw', (err, files) => {
  for (let i = 0; i < files.length; i++)
    require('rimraf')(`facenetService/image/classify_result/raw/${files[i]}`, () => { })
})

require('fs').readdir('facenetService/image/classify_result/cut', (err, files) => {
  for (let i = 0; i < files.length; i++)
    require('rimraf')(`facenetService/image/classify_result/cut/${files[i]}`, () => { })
})

require('fs').readdir('facenetService/models', (err, files) => {
  for(let i = 0 ; i < files.length ; i++) {
    if (files[i] != `20170512-110547.pb` && files[i] != `faces` && files[i] != `init_model.pkl`) {
      require('rimraf')(`facenetService/models/${files[i]}`,()=>{})
    }
  }
})

require('fs').readdir('facenetService/models/faces', (err, files) => {
  for (let i = 0; i < files.length; i++) {
    if (files[i] != `unknown.pkl`) {
      require('rimraf')(`facenetService/models/faces/${files[i]}`, () => { })
    }
  }
})

require('fs').readdir('facenetService/image/history', (err, files) => {
  for(let i = 0 ; i < files.length ; i++)
    require('rimraf')(`image/${files[i]}`,()=>{})
})

console.log('Finished Initial database and image folder')