
module.exports = (app, passport) => {
    const express = require('express')
    const ImageController = require('./controllers/ImageController')
    const AuthenticationController = require('./controllers/AuthenticationController')
    const EquipmentController = require('./controllers/EquipmentController')
    const FaceController = require('./controllers/FaceController')
    const AuthenticationRouter = express.Router()
    const imageRouter = express.Router()
    const facenetRouter = express.Router()
    const equipmentRouter = express.Router()
    const faceRouter = express.Router()

    AuthenticationRouter.post('/login', passport.authenticate('local', { session: true }), AuthenticationController.login)
    AuthenticationRouter.get('/logout', AuthenticationController.logout)
    AuthenticationRouter.get('/username', AuthenticationController.username)
    imageRouter.post('/upload/face', ImageController.uploadFace)
    equipmentRouter.get('/', EquipmentController.GetEquipments)
    faceRouter.get('/:equipmentId', FaceController.GetFaces)

    app.use('/api/authentication', AuthenticationRouter)
    // app.use('*', AuthenticationController.Islogin)
    app.use('/api/equipment', equipmentRouter)
    app.use('/api/face', faceRouter)
    app.use('/api/image', imageRouter)
    app.use('/api/run', facenetRouter)
}