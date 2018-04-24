<template>
  <div id="modelStatus" >
    <div class="row">
      <div class="col-3"></div>
      <button id="train" @click="TrainModel()" class="col-6 btn btn-primary">訓練模型</button>
    </div>
  </div>
</template>

<script>

import TrainService from '@/services/TrainService'

export default {
  name: 'ModelStatus',

  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },

  methods: {
    async TrainModel(){
      const response = await TrainService.upload()
      console.log(response)
    },
  }
}
</script>

<style>
#camera {
  text-align: center;
}

#upload {
  text-align: center;
}
</style>
