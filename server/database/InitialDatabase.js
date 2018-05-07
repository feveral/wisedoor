const config = require('../config/config')
delete config.db_config.database
const db = require('mysql').createConnection(config.db_config)

db.query('DROP DATABASE IF EXISTS Wisedoor;', () => { console.log('Drop Database') })
db.query('CREATE DATABASE Wisedoor;', () => { console.log('Create Database') })
db.query('USE Wisedoor;', () => { console.log('Use Database') })

db.query('DROP TABLE IF EXISTS USER;', () => { console.log('Drop USER') })
db.query('DROP TABLE IF EXISTS GROUP;', () => { console.log('Drop GROUP') })
db.query('DROP TABLE IF EXISTS FACE;', () => { console.log('Drop FACE') })
db.query('DROP TABLE IF EXISTS MODEL;', () => { console.log('Drop MODEL') })

db.query(
  `CREATE TABLE USER
   (
     Email VARCHAR(255) CHARACTER SET utf8 NOT NULL ,  
     Name VARCHAR(255) CHARACTER SET utf8 NOT NULL ,  
     Password VARCHAR(255) CHARACTER SET utf8 NOT NULL ,  
     PRIMARY KEY(Email)
   );`,
  (err, result) => {
    if (err) {
      console.log(err)
    } else {
      console.log('Create Table USER')
    }
  }
)

db.query(
  `CREATE TABLE EQUIPMENT
   (
     Id VARCHAR(255) CHARACTER SET utf8 NOT NULL ,
     OwnerEmail VARCHAR(255) CHARACTER SET utf8 NOT NULL , 
     Name VARCHAR(255) CHARACTER SET utf8 NOT NULL , 
     ModelId VARCHAR(255) CHARACTER SET utf8 , 
     PRIMARY KEY(Id) , 
     FOREIGN KEY(OwnerEmail) REFERENCES USER(Email)
   );`,
  (err, result) => {
    if (err) {
      console.log(err)
    } else {
      console.log('Create Table EQUIPMENT')
    }
  }
)

db.query(
  `CREATE TABLE FACE
   (
     Id VARCHAR(255) CHARACTER SET utf8 NOT NULL , 
     Name VARCHAR(255) CHARACTER SET utf8 NOT NULL , 
     PRIMARY KEY(Id)  
   );`,
  (err, result) => {
    if (err) {
      console.log(err)
    } else {
      console.log('Create Table FACE')
    }
  }
)

db.query(
  `CREATE TABLE MODEL
   (
     Id VARCHAR(255) CHARACTER SET utf8 NOT NULL ,
     Time VARCHAR(255) CHARACTER SET utf8 NOT NULL , 
     EquipmentId VARCHAR(255) CHARACTER SET utf8 NOT NULL , 
     PRIMARY KEY(Id) , 
     FOREIGN KEY(EquipmentId) REFERENCES EQUIPMENT(Id)
   );`,
  (err, result) => {
    if (err) {
      console.log(err)
    } else {
      console.log('Create Table MODEL')
    }
  }
)

db.query(
  `CREATE TABLE FACE_BELONG_MODEL
   (
     FaceId VARCHAR(255) CHARACTER SET utf8 NOT NULL ,
     ModelId VARCHAR(255) CHARACTER SET utf8 NOT NULL , 
     PRIMARY KEY(FaceId,ModelId) , 
     FOREIGN KEY(FaceId) REFERENCES FACE(Id),
     FOREIGN KEY(ModelId) REFERENCES MODEL(Id)
   );`,
  (err, result) => {
    if (err) {
      console.log(err)
    } else {
      console.log('Create Table FACE_BELONG_MODEL')
    }
  }
)

db.query(
  `CREATE TABLE FACE_BELONG_EQUIPMENT
   (
     FaceId VARCHAR(255) CHARACTER SET utf8 NOT NULL ,
     EquipmentId VARCHAR(255) CHARACTER SET utf8 NOT NULL , 
     PRIMARY KEY(FaceId,EquipmentId) , 
     FOREIGN KEY(FaceId) REFERENCES FACE(Id),
     FOREIGN KEY(EquipmentId) REFERENCES EQUIPMENT(Id)
   );`,
  (err, result) => {
    if (err) {
      console.log(err)
    } else {
      console.log('Create Table FACE_BELONG_EQUIPMENT')
    }
  }
)

db.query(`insert into USER VALUES('feveraly@gmail.com','宗翰','5566');`)
db.query(`insert into USER VALUES('john@gmail.com','忠禮','5566');`)

db.query(`insert into EQUIPMENT VALUES('259c7ae134d7ffe7f58fb5fda3561b68','feveraly@gmail.com','家裡的門',NULL);`)

db.end()

require('fs').readdir('facenetTrain/image/raw', (err, files) => {
  for(let i = 0 ; i < files.length ; i++)
    require('rimraf')(`facenetTrain/image/raw/${files[i]}`, () => { console.log('clear server/facenetTrain/image/raw'); });
})

require('fs').readdir('facenetTrain/image/cut', (err, files) => {
  for(let i = 0 ; i < files.length ; i++)
    require('rimraf')(`facenetTrain/image/cut/${files[i]}`, () => { console.log('clear server/facenetTrain/image/cut'); });
})