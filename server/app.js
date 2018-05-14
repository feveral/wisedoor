const express = require('express')
const http = require('http')
const https = require('https')
const bodyParser = require('body-parser')
const cors = require('cors')
const fs = require('fs')
const history = require('connect-history-api-fallback')
const config = require('./config/config')
const httpApp = express()
const app = express()
const privateKey = fs.readFileSync(__dirname + '/ssl/private.key');
const certificate = fs.readFileSync(__dirname + '/ssl/certificate.crt');
const credentials = { key: privateKey, cert: certificate }

app.set('port', process.env.PORT || config.httpsPort)
// app.use(history())
app.use(express.static('../client/dist'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '50mb', type: 'application/json' }));
app.use(cors({
  origin: config.corsOrigin,
  credentials: true
}))

httpApp.set('port', process.env.PORT || config.httpPort)
httpApp.get("*", (req, res, next) => {
  res.redirect("https://" + req.headers.host + req.path);
})

let passport = require('./passport')(app)
let routes = require('./routes')(app, passport)

http.createServer(httpApp).listen(httpApp.get('port'), () => {})
https.createServer(credentials, app).listen(app.get('port'), () => {})
/*
const shell = require('shelljs')
const str = shell.exec('python3 ./faceAlign/app.py', { async: true, silent: false }, (code, stdout, stderr) => {
})
*/