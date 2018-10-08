
module.exports = (app, passport) => {
    const express = require('express')
    const ImageController = require('./controllers/ImageController')
    const AuthenticationController = require('./controllers/AuthenticationController')
    const EquipmentController = require('./controllers/EquipmentController')
    const FaceController = require('./controllers/FaceController')
    const ModelController = require('./controllers/ModelController') 
    const HistoryController = require('./controllers/HistoryController')
    const FacenetServiceController = require('./controllers/FacenetServiceController')
    const classifyResultController = require('./controllers/ClassifyResultController')
    const AuthenticationRouter = express.Router()
    const imageRouter = express.Router().all('*', AuthenticationController.authenticate)
    const equipmentRouter = express.Router().all('*', AuthenticationController.authenticate)
    const faceRouter = express.Router().all('*', AuthenticationController.authenticate)
    const historyRouter = express.Router().all('*', AuthenticationController.authenticate)
    const facenetServiceRouter = express.Router().all('*', AuthenticationController.authenticate)
    const classifyResultRouter = express.Router().all('*', AuthenticationController.authenticate)
    const modelRouter = express.Router()

    AuthenticationRouter.post('/login', passport.authenticate('local', { session: true }), AuthenticationController.login)
    AuthenticationRouter.get('/logout', AuthenticationController.logout)
    AuthenticationRouter.get('/username', AuthenticationController.username)

    imageRouter.post('/upload/face',ImageController.faceNameFilter,
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
    equipmentRouter.post('/setPassword', EquipmentController.SetPassword)
    equipmentRouter.post('/getPassword', EquipmentController.GetPassword)
    faceRouter.get('/:equipmentId', FaceController.GetFaces)
    faceRouter.post('/delete', FaceController.DeleteFace,
                                FaceController.ReTrainModel)
    modelRouter.post('/', AuthenticationController.authenticate, ModelController.GetModel)
    modelRouter.post('/notify',ModelController.NotifyTrainFinish)
    modelRouter.post('/check', ModelController.CheckModelIsTrain)
    
    historyRouter.post('/getRecord', HistoryController.GetRecord)
    historyRouter.post('/', HistoryController.AddHistory)

    facenetServiceRouter.post('/classify',  FacenetServiceController.saveClassifyData ,
                                            FacenetServiceController.classify)

    classifyResultRouter.get('/amount/:equipmentName/', classifyResultController.getPageAmount)
    classifyResultRouter.get('/:equipmentName/:page', classifyResultController.getClassifyResult)
    
    app.use('/api/authentication', AuthenticationRouter)
    app.use('/api/equipment', equipmentRouter)
    app.use('/api/face', faceRouter)
    app.use('/api/image', imageRouter)
    app.use('/api/model', modelRouter)
    app.use('/api/history', historyRouter)
    app.use('/api/facenet', facenetServiceRouter)
    app.use('/api/classifyresult', classifyResultRouter)
}