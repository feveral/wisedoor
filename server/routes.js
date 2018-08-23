
module.exports = (app, passport) => {
    const express = require('express')
    const ImageController = require('./controllers/ImageController')
    const AuthenticationController = require('./controllers/AuthenticationController')
    const EquipmentController = require('./controllers/EquipmentController')
    const FaceController = require('./controllers/FaceController')
    const ModelController = require('./controllers/ModelController') 
    const HistoryController = require('./controllers/HistoryController')
    const AuthenticationRouter = express.Router()
    const imageRouter = express.Router()
    const facenetRouter = express.Router()
    const equipmentRouter = express.Router()
    const faceRouter = express.Router()
    const modelRouter = express.Router()
    const historyRouter = express.Router()

    AuthenticationRouter.post('/login', passport.authenticate('local', { session: true }), AuthenticationController.login)
    AuthenticationRouter.get('/logout', AuthenticationController.logout)
    AuthenticationRouter.get('/username', AuthenticationController.username)

    imageRouter.post('/upload/face',AuthenticationController.Islogin,
                                    ImageController.retrieveEquipmentId,
                                    ImageController.retrieveFaceId,
                                    ImageController.checkIsUpload,
                                    ImageController.makeRawDirectIfnotExist,
                                    ImageController.saveRawImage,
                                    ImageController.alignFace,
                                    ImageController.checkAlignProgressAndResponse,
                                    ImageController.trainFace)

    equipmentRouter.get('/', EquipmentController.GetEquipments)
    equipmentRouter.post('/',EquipmentController.register)
    equipmentRouter.post('/setPassword',EquipmentController.SetPassword)
    equipmentRouter.post('/getPassword',AuthenticationController.authenticate,
                                        EquipmentController.GetPassword)
    faceRouter.get('/:equipmentId', FaceController.GetFaces)
    modelRouter.post('/',   AuthenticationController.authenticate,
                            ModelController.GetModel)
    modelRouter.post('/notify',ModelController.NotifyTrainFinish)
    modelRouter.post('/check', ModelController.CheckModelIsTrain)
    
    historyRouter.post('/', HistoryController.AddHistory)

    app.use('/api/authentication', AuthenticationRouter)
    app.use('/api/equipment', equipmentRouter)
    app.use('/api/face', faceRouter)
    app.use('/api/image', imageRouter)
    app.use('/api/run', facenetRouter)
    app.use('/api/model', modelRouter)
    app.use('/api/history', historyRouter)
}