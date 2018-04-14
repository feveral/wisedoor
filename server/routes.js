
module.exports = (app, passport) => {
    const express = require('express')
    const ImageController = require('./controllers/ImageController')
    const AuthenticationController = require('./controllers/AuthenticationController')
    const AuthenticationRouter = express.Router()
    const imageRouter = express.Router()

    AuthenticationRouter.post('/', passport.authenticate('local', { session: true }), AuthenticationController.login)
    AuthenticationRouter.get('/username', AuthenticationController.username)
    imageRouter.post('/upload', ImageController.upload)
    app.use('/api/login', AuthenticationRouter);
    app.use('/api/image', imageRouter);
}