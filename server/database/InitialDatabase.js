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
db.query(`insert into USER VALUES('feveraly@gmail.com','宗翰','5566');`)
db.query(`insert into USER VALUES('john@gmail.com','忠禮','5566');`)
db.query(`insert into EQUIPMENT VALUES('259c7ae134d7ffe7f58fb5fda3561b68','feveraly@gmail.com','家裡的門',NULL,false);`)
db.end()

if (!require('fs').existsSync('facenetTrain/image/raw')) {
  require('fs').mkdirSync('facenetTrain/image/raw')
}

if (!require('fs').existsSync('facenetTrain/image/cut')) {
  require('fs').mkdirSync('facenetTrain/image/cut')
}

if (!require('fs').existsSync('facenetTrain/models')) {
  require('fs').mkdirSync('facenetTrain/models')
}

require('fs').readdir('facenetTrain/image/raw', (err, files) => {
  for(let i = 0 ; i < files.length ; i++)
    require('rimraf')(`facenetTrain/image/raw/${files[i]}`,()=>{})
})

require('fs').readdir('facenetTrain/image/cut', (err, files) => {
  for(let i = 0 ; i < files.length ; i++)
    require('rimraf')(`facenetTrain/image/cut/${files[i]}`,()=>{})
})

require('fs').readdir('facenetTrain/models', (err, files) => {
  for(let i = 0 ; i < files.length ; i++)
    require('rimraf')(`facenetTrain/models/${files[i]}`,()=>{})
})

console.log('Finished Initial database and image folder')