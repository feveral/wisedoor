import Api from '@/services/Api'

export default {

  async GetEquipments() {
    return Api().get('equipment')
  }
}