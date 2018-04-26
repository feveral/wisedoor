import Api from '@/services/Api'

export default {
    upload(imageData){
        return Api().post('image/upload', {image: imageData})
    },

    uploadFace (imageData, faceName, equipmentName) {
        return Api().post('image/upload/face', {
            image: imageData,
            faceName: faceName,
            equipmentName: equipmentName
        })
    }
}