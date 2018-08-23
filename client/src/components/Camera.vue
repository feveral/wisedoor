<template>
  <div id="camera" >
    <div class="row mb-4 justify-content-center">
      <video @click="OpenCamera()" id="video" ref="video" width="640" height="480" class="col-12" autoplay="" >
      </video>
    </div>
    <p>{{errorMessage}}</p>
  </div>
</template>

<script>

import ImageService from '@/services/ImageService'

export default {
  name: 'Camera',

  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      cameraIndex: 0,
      debug: '',
      errorMessage: ''
    }
  },

  mounted(){
    this.OpenCamera()
  },

  methods: {
    
    async OpenCamera(){
        this.errorMessage = 'wetger'
      
      // IPhone 無法使用 , HTC10 前鏡頭無法打開 , LG G6 可正常使用
      let video = this.$refs.video
      navigator.mediaDevices.getUserMedia({
        audio: false,
        video: true
      }).then((stream)=> {
        video.srcObject = stream;
      }).catch((error)=>{
      
      })
      /*
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
          navigator.mediaDevices.getUserMedia({ video: { deviceId: {'exact':devices[this.cameraIndex].deviceId}, facingMode: "user"  }}).then( (stream) => {
            video.src = window.URL.createObjectURL(stream);
            video.play();
          })
      })*/
    },
    
    getVideoImage(){
      const video = document.getElementById('video')
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d');
      const width = video.width
      const height = video.height
      canvas.width = width
      canvas.height = height
      context.drawImage(video,0,0,width,height,0,0,width,height)
      return canvas.toDataURL("image/png").substr(22);
    },

    async uploadFace (faceName,equipmentName) {
      let response
      let imageData
      this.$emit('upgradeProgress',0)
      do {
        imageData = this.getVideoImage()
        response = await ImageService.uploadFace(imageData,faceName,equipmentName)
        if (response.data.error) {
          alert('上傳失敗')
          break
        }
        this.$emit('upgradeProgress',response.data.progress)
      } while (response.data.progress < 100)
      alert('上傳完成 臉孔處理中')
      this.$emit('upgradeProgress',0)
      this.$emit('notifyTrainStart',equipmentName)
    }
  }
}
</script>

<style>
#camera {
  text-align: center;
  padding: 0;
  max-width: 100%;
}

#upload {
  text-align: center;
}

</style>
