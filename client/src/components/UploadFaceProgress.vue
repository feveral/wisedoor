<template>
  <div id="upload-face-progress" >
    <div class="row justify-content-end">
      <p id="text-progress" class="col-12 text-right">上傳進度 {{percentage}} / 100</p>
    </div>
    <div class="progress">
      <div class="progress-bar bg-success" role="progressbar" :style="{ width: percentage + '%' }" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
    </div>
  </div>
</template>

<script>

import TrainService from '@/services/TrainService'

export default {
  name: 'UploadFaceProgress',

  data () {
    return {
      percentage: 0
    }
  },

  methods: {
    setPercentage (percent) {
      this.percentage = percent
    }
  }
}
</script>

<style>

#text-progress {
  font-size: 18px;
}

.text-right {
  text-align: right;
}
</style>
