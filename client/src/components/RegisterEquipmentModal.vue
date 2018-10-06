<template>
<div id="register-equipment-modal" class="modal fade bd-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-sm">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">新增設備</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <input type="text" class="form-control" v-model="equipmentName" placeholder="新設備名稱">
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

import EquipmentService from '@/services/EquipmentService'
import FaceService from '@/services/FaceService'

export default {
  name: 'RegisterEquipmentModal',

  data () {
    return {
      equipmentName: ''
    }
  },

  mounted(){

},

  methods: {
    async onClickCheckButton () {
      const response = await EquipmentService.register(this.equipmentName)
      $('#register-equipment-modal').modal('hide')
      if ( !response.data.error ) {
        this.$emit('registerEquipmentSuccess')
        alert('設備添加成功，可以開始新增臉孔')
      } else {
        alert('設備添加失敗，請稍候重新再試')
      }
    }

  }
}
</script>

<style>

</style>
