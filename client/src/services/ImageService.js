import Api from '@/services/Api'

export default {

    uploadFace (imageData, faceName, equipmentName) {
        return Api().post('image/upload/face', {
            image: imageData,
            faceName: faceName,
            equipmentName: equipmentName
        })
    },

    uploadClassifyImage(imageData, equipmentName) {
        return Api().post('facenet/classify', {
            image: imageData,
            equipmentName: equipmentName
        })
    }
}