import Api from '@/services/Api'

export default {
    
    getRecord (equipmentId) {
        return Api().post('history/getRecord', { equipmentId: equipmentId})
    },
}