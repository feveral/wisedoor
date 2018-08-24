import Api from '@/services/Api'

export default {

  async GetFaces(equipmentId) {
    return Api().get(`face/${equipmentId}`)
  },

  async UploadDeleteFace(faceId,equipmentId){
    return Api().post(`face/delete`, {faceId:faceId, equipmentId:equipmentId})
  }
}