<template>
  <div id="train-menu">
    <div class="row justify-content-around">
      <button class="mb-4 col-5 col-lg-12 btn btn-outline-dark train-menu-button" data-toggle="modal" data-target="#add-face-modal" @click="$emit('clickAddFace')">新增臉孔</button>
      <button class="mb-4 col-5 col-lg-12 btn btn-outline-dark train-menu-button" data-toggle="modal" data-target="#register-equipment-modal">新增設備</button>
      <button class="mb-4 col-5 col-lg-12 btn btn-outline-dark train-menu-button" @click="$emit('clickOpenDoorRecord')">開門紀錄</button>
      <button class="mb-4 col-5 col-lg-12 btn btn-outline-dark train-menu-button" data-toggle="modal" data-target="#set-equipment-password-modal">設定密碼</button>
    </div>
  </div>
</template>

<script>

import TrainService from '@/services/TrainService'

export default {
  name: 'train-menu',

  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },

  methods: {
    async registerEquipment(){
      const response = await TrainService.upload()
      console.log(response)
    }
  }
}
</script>

<style>

.train-menu-button {
  font-size: 25px;
  font-weight: bold;
}

</style>
