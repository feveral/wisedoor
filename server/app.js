const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(express.static('../client/dist'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '50mb', type: 'application/json' }));
app.use(cors({
  origin: "http://localhost:8080",
  credentials: true
}))

const shell = require('shelljs');
const str = shell.exec('python3 ./faceAlign/app.py', {async:true,silent:false}, (code, stdout, stderr) => {
});

let passport = require('./passport')(app)
let routes = require('./routes')(app, passport)

app.listen(80);
