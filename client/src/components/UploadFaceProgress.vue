<template>
  <div id="upload-face-progress" >
    <div class="progress">
    <div class="progress-bar bg-success" role="progressbar" style="width: 25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
</div>
  </div>
</template>

<script>

import TrainService from '@/services/TrainService'

export default {
  name: 'UploadFaceProgress',

  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },

  methods: {
    
  }
}
</script>

<style>

</style>
