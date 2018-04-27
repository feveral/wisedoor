<template>

<div id="add-face-modal" class="modal fade bd-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-sm">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">新增臉孔</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p>請選擇一個您的設備</p>
        <div class="equipment-choose-button mb-4" v-for="(equipment,index) in equipments">
          <button type="button" class="btn btn-success" @click="chooseEquipment(index)">{{ equipment.name }}</button>
          <img src="../assets/sign-check-icon.png" v-if="choosed[index]" width="30px" alt="">
        </div>
        <p>請輸入臉孔名稱</p>
        <div class="form-group">
          <input type="text" class="form-control" v-model="faceName" placeholder="臉孔名稱">
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>   
        <button type="button" class="btn btn-primary" @click="onClickCheckButton()">確定加入臉孔</button>   
      </div>
    </div>
  </div>
</div>


</template>

<script>

import equipmentListData from '../fixtures/equipmentList.json'

export default {
  name: 'AddFaceModal',

  data () {
    return {
      equipments: equipmentListData.equipment,
      choosed: { ...new Array(equipmentListData.equipment.length).fill(false) },
      faceName: "",
      equipmentName: ""
    }
  },

  mounted(){
    
  },

  methods: {
    chooseEquipment (index) {
      for (let key in this.choosed) {
        this.choosed[key] = false      
      }
      this.choosed[index] = true
      this.equipmentName = this.equipments[index].name
    },

    onClickCheckButton () {
      const faceName = this.faceName
      const equipmentName = this.equipmentName
      this.$emit('addFaceTest',{faceName,equipmentName})
    }
  }
}
</script>

<style>
.equipment-choose-button {
  display: block;
}
</style>
