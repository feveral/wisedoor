import Api from '@/services/Api'

export default {

  async GetEquipments() {
    return Api().get('equipment')
  },

  async register(equipmentName) {
    return Api().post('equipment', { equipmentName: equipmentName })
  },

  async SetPassword(equipmentName, password) {
    return Api().post('equipment/setPassword', { equipmentName: equipmentName , password: password})
  }
}