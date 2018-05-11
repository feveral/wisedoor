<template>
  <div id="train-menu">
    <div class="row">
      <button class="col-6 col-lg-12 btn btn-primary squareButton" data-toggle="modal" data-target="#add-face-modal">新增臉孔</button>
      <button class="col-6 col-lg-12 btn btn-success squareButton">登入紀錄</button>
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
    async TrainModel(){
      const response = await TrainService.upload()
      console.log(response)
    }
  }
}
</script>

<style>

.squareButton {
  height: 120px;
}

</style>
