import Api from '@/services/Api'

export default {

    uploadFace (imageData, faceName, equipmentName) {
        return Api().post('image/upload/face', {
            image: imageData,
            faceName: faceName,
            equipmentName: equipmentName
        })
    }
}