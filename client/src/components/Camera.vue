<template>
  <div id="camera" >
    <div class="row justify-content-center">
      <video @click="OpenCamera()" id="video" ref="video"  class="col-12" autoplay playsinline >
      </video>
      <upload-face-progress ref="progress" class="col-12 col-lg-10"></upload-face-progress>
    </div>
  </div>
</template>

<script>

import ImageService from '@/services/ImageService'
import UploadFaceProgress from '@/components/UploadFaceProgress'
import Media from 'vue-media'


export default {
  name: 'Camera',
  
  components: {
    Media,
    UploadFaceProgress
  },

  data () {
    return {
      cameraIndex: 0,
      debug: '',
    }
  },

  mounted(){
    this.OpenCamera()
  },

  methods: {
    
    async OpenCamera(){
      
      // ////  Smart Phone Version
      // navigator.mediaDevices.getUserMedia({
      //   audio: false,
      //   video: true
      // }).then((stream)=> {
      //   const video = document.querySelector('video');
      //   video.srcObject = stream;
      // })
      //////
      let video = this.$refs.video
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
      })
    },
    
    getVideoImage(){
      const video = document.getElementById('video')
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d');
      const width = video.clientWidth
      const height = video.clientHeight
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
        this.$refs.progress.setPercentage(response.data.progress)
      } while (response.data.progress < 100)
      alert('上傳完成 臉孔處理中')
      this.$refs.progress.setPercentage(0)
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

#video {
  margin-bottom: 8px;
}

#upload {
  text-align: center;
}

</style>
