import Api from '@/services/Api'

export default {

  async getClassifyResults(equipmentName, offset) {
    return Api().get(`classifyresult/${equipmentName}/${offset}`)
  },

  async getPageAmount(equipmentName) {
    return Api().get(`classifyresult/amount/${equipmentName}`)
  }
}