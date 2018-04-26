
module.exports = (app, passport) => {
    const express = require('express')
    const ImageController = require('./controllers/ImageController')
    const AuthenticationController = require('./controllers/AuthenticationController')
    const FacenetController = require('./controllers/FacenetController')
    const AuthenticationRouter = express.Router()
    const imageRouter = express.Router()
    const facenetRouter = express.Router()

    AuthenticationRouter.post('/login', passport.authenticate('local', { session: true }), AuthenticationController.login)
    AuthenticationRouter.get('/logout', AuthenticationController.logout)
    AuthenticationRouter.get('/username', AuthenticationController.username)
    imageRouter.post('/upload/face', ImageController.uploadFace)
    facenetRouter.get('/train', FacenetController.train)
    facenetRouter.get('/checkModelStatus', FacenetController.checkModelStatus)
    facenetRouter.get('/modelFinish', FacenetController.modelFinish)
    app.use('/api/authentication', AuthenticationRouter);
    app.use('/api/image', imageRouter);
    app.use('/api/run', facenetRouter);
}