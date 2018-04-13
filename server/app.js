const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(express.static('../client/dist'));
app.use(bodyParser.json({ limit: '50mb', type: 'application/json' }));
app.use(cors())

require('./routes')(app)

app.listen(80);
