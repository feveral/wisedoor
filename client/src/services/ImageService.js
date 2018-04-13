import Api from '@/services/Api'

export default {
    upload(imageData){
        return Api().post('image/upload', {image: imageData})
    }
}