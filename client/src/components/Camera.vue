<template>
  <div id="camera" >
    <div class="row mb-4">
      <video @click="OpenCamera()" id="video" ref="video" class="col-12" width="640" height="480" autoplay="" >
      </video>
    </div>
    <!--<div class="row">
      <div class="col-3"></div>
      <button id="upload" @click="uploadImage()" class="col-6 btn btn-success">上傳圖片</button>
    </div>
    -->
  </div>
</template>

<script>

import ImageService from '@/services/ImageService'

export default {
  name: 'Camera',

  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      cameraIndex: 0
    }
  },

  mounted(){
    this.OpenCamera()
  },

  methods: {
    
    async OpenCamera(){
      let video = this.$refs.video;
      navigator.mediaDevices.enumerateDevices().then( (devices) => {
          devices = devices.filter( (devices) => { return devices.kind === 'videoinput'; });
          if (devices.length == 1) { // 只有一個鏡頭
            this.cameraIndex = 0
          }
          else if (this.cameraIndex == 0) { //有兩鏡頭且現在再第1鏡頭 
            this.cameraIndex = 1
          }
          else if (this.cameraIndex == 1) { //有兩鏡頭且現在再第2鏡頭
            this.cameraIndex = 0
          }
          navigator.mediaDevices.getUserMedia({ video: { deviceId: {'exact':devices[this.cameraIndex].deviceId}, facingMode: 'environment' }}).then( (stream) => {
            video.src = window.URL.createObjectURL(stream);
            video.play();
          });
      })
    },
    
    getVideoImage(){
      const video = document.getElementById('video')
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      const width = video.width;
      const height = video.height;
      canvas.width = width
      canvas.height = height
      context.drawImage(video,0,0,width,height,0,0,width,height);
      return canvas.toDataURL("image/png").substr(22);
    },

    async uploadFace (faceName,equipmentName) {
      let response
      let imageData
      this.$emit('upgradeProgress',0)
      do {
        imageData = this.getVideoImage()
        response = await ImageService.uploadFace(imageData,faceName,equipmentName)
        this.$emit('upgradeProgress',response.data.progress * 4)
      } while (response.data.progress < 25)
      alert('上傳完成')
      this.$emit('upgradeProgress',0)
    }
  }
}
</script>

<style>
#camera {
  text-align: center;
  padding: 0;
}

#upload {
  text-align: center;
}

</style>
