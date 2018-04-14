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

db.query(`insert into USER VALUES('feveraly@gmail.com','宗翰','5566');`)

db.query(
  `CREATE TABLE GROUPS
   (
     Id VARCHAR(255) CHARACTER SET utf8 NOT NULL ,
     Owner VARCHAR(255) CHARACTER SET utf8 NOT NULL , 
     PRIMARY KEY(Id) , 
     FOREIGN KEY(Owner) REFERENCES USER(Email)
   );`,
  (err, result) => {
    if (err) {
      console.log(err)
    } else {
      console.log('Create Table GROUP')
    }
  }
)

db.query(
  `CREATE TABLE FACE
   (
     GroupsId VARCHAR(255) CHARACTER SET utf8 NOT NULL , 
     Name VARCHAR(255) CHARACTER SET utf8 NOT NULL , 
     PRIMARY KEY(GroupsId,Name) , 
     FOREIGN KEY(GroupsId) REFERENCES GROUPS(Id)
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
     GroupsId VARCHAR(255) CHARACTER SET utf8 NOT NULL , 
     PRIMARY KEY(Id) , 
     FOREIGN KEY(GroupsId) REFERENCES GROUPS(Id)
   );`,
  (err, result) => {
    if (err) {
      console.log(err)
    } else {
      console.log('Create Table MODEL')
    }
  }
)
db.end()
