import Api from '@/services/Api'

export default {
    
    getPageAmount (equipmentId) {
        return Api().get(`history/amount/${equipmentId}`)
    },

    getRecord (equipmentId, page) {
        return Api().get(`history/${equipmentId}/${page}`)
    },
}