<template>
  <div id="online-classify" class="row">
    <div v-show="!resultName"  class="col-12" ></div>
    <transition>
      <div v-show="resultShow" class="col-12" id="classify-result">
        <span class="classify-result-prompt">{{resultprompt}}</span>
        <span class="classify-result-name">{{resultName}}</span>
      </div>
    </transition>

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
      resultName: '',
      resultShow: false
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

    setResult (name, success) {
      this.resultShow = true
      if (!success) {
        this.resultName = ''
        this.resultprompt = '沒有辨識到任何臉孔'
      } else {
        this.resultprompt = '鏡頭前的你是'
        this.resultName = name
      }
    },

    finishClassify (name, success) {
      this.resultShow = false
      setTimeout(this.setResult, 300, name, success);
    }
  }
}
</script>

<style>

#classify-result {
  padding-top: 5px;
  border-radius: 15px;
}
.v-leave {
  opacity: 1;
}

.v-leave-active {
  transition: opacity .5s
}

.v-leave-to {
  opacity: 0;
}

.v-enter {
  opacity: 0;
}

.v-enter-active {
  transition: opacity .5s
}

.v-enter-to {
  opacity: 1;
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
