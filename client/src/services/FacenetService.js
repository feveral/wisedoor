import Api from '@/services/Api'

export default {

    classifyImage(imageData, equipmentName) {
        return Api().post('facenet/classify', {
            image: imageData,
            equipmentName: equipmentName
        })
    }
}