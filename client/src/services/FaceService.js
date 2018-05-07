import Api from '@/services/Api'

export default {

  async GetFaces(equipmentId) {
    return Api().get(`face/${equipmentId}`)
  }
}