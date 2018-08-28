<template>
  <div id="online-classify" class="row">
    <div class="col-9" id="classify-result">
      <span class="classify-result-prompt">{{resultprompt}}</span>
      <span class="classify-result-name">{{resultName}}</span>
    </div>
    <div class="dropdown show col-3">
      <a class="btn btn-primary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        立即辨識
      </a>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
        <a class="dropdown-item" href="#"  @click="onClickChooseEquipment(equipment.Name)" v-for="equipment in equipments">{{equipment.Name}}</a>
      </div>
    </div>
  </div>
</template>

<script>

import EquipmentService from '@/services/EquipmentService'

export default {
  name: 'OnlineClassify',

  data () {
    return {
      equipments: [] ,
      resultprompt: '',
      resultName: ''
    }
  },

  async mounted () {
    this.equipments = (await EquipmentService.GetEquipments()).data
  },

  methods:{
    async UpdateEquipments () {
      this.equipments = (await EquipmentService.GetEquipments()).data
    },

    onClickChooseEquipment (equipmentName) {
      this.$emit('clickOnlineClassify',equipmentName)
    },

    finishClassify (name, success) {
      if (!success) {
        this.resultName = ''
        this.resultprompt = '沒有辨識到任何臉孔'
      } else {
        this.resultprompt = '鏡頭前的你是'
        this.resultName = name
      }
    }
  }
}
</script>

<style>

#classify-result {
  padding-top: 5px;
}

.classify-result-prompt {
  font-size: 20px;
  display: inline-block;
}

.classify-result-name {
  font-size: 20px;
  display: inline-block;
  color: red;  
}
</style>
