<template>
    <div id="set-equipment-password-modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">設定密碼</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            </div>
            <div class="modal-body">
              <p class="prompt-text-size">請選擇一個您的設備</p>
              <div class="equipment-choose-button mb-4" v-for="(equipment,index) in equipments">
                <button type="button" class="btn btn-outline-dark equipment-button-size" @click="chooseEquipment(index)">{{ equipment.Name }}</button>
                <img src="../assets/sign-check-icon.png" v-if="choosed[index]" width="30px" alt="">
              </div>
              <p class="prompt-text-size">請輸入要改的密碼</p>
              <div class="form-group">
                  <input type="password" class="form-control input-face-name-size" v-model="password" placeholder="輸入密碼">
              </div>
            </div>
            <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="setPassword()">確認修改</button>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
import equipmentListData from '../fixtures/equipmentList.json'
import EquipmentService from '@/services/EquipmentService'
import FaceService from '@/services/FaceService'

export default {
  name: 'EquipmentList',

  data () {
    return {
      equipments: equipmentListData,
      choosed: { ...new Array(equipmentListData.length).fill(false) },
      password: "",
      equipmentName: ""
    }
  },

    mounted(){
    this.UpdateEquipmentList()
  },

  methods: {
    async UpdateEquipmentList () {
      this.equipments = (await EquipmentService.GetEquipments()).data
      this.choosed = { ...new Array(this.equipments.length).fill(false) }
      if (this.equipments.length > 0) {
        this.choosed[0] = true
        this.equipmentName = this.equipments[0].Name
      } 
    },

    async setPassword () {
      if(this.password.length < 4 ){
        alert("密碼太短 至少要4位元")
      }
      else if(isNaN(this.password)){
        alert("密碼只能是數字喔")
      }
      else{
        let response =  await EquipmentService.SetPassword(this.equipmentName ,this.password)
        $('#set-equipment-password-modal').modal('hide')
      }
    },

    chooseEquipment (index) {
      for (let key in this.choosed) {
        this.choosed[key] = false      
      }
      this.choosed[index] = true
      this.equipmentName = this.equipments[index].Name
    },
  }
}
</script>

<style>

</style>
