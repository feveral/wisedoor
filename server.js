const express = require('express');
const http = require('http');
const PictureServer = require('./server/PictureServer.js');
var PictureRouter = express.Router();
new PictureServer(PictureRouter);


var app = express();
app.use('/image', PictureRouter);
app.use(express.static('public'));
app.listen(80);