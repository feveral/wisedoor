
module.exports = app => {
    const express = require('express')
    const ImageController = require('./controllers/ImageController')
    const imageRouter = express.Router()

    imageRouter.post('/upload', ImageController.upload)
    app.use('/api/image', imageRouter);
}