import Api from '@/services/Api'

export default {
    upload(){
        return Api().get('run/train')
    }
}