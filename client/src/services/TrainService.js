import Api from '@/services/Api'

export default {
    upload(){
        return Api().get('run/train')
    },

    checkModelIsOk(equipmentName){
        return Api().post('model/check', { equipmentName: equipmentName})
    }
}