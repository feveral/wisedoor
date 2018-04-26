<template>
  <div id="camera" >
    <div class="row mb-4">
      <video id="video" ref="video" class="col-12" width="640" height="480" autoplay="" ></video>
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
      msg: 'Welcome to Your Vue.js App'
    }
  },

  mounted(){
    this.OpenCamera()
  },

  methods: {
    
    OpenCamera(){
      var video = this.$refs.video;
      // Get access to the camera!
      if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Not adding `{ audio: true }` since we only want video now
          navigator.mediaDevices.getUserMedia({ video: true }).then( (stream) => {
              video.src = window.URL.createObjectURL(stream);
              video.play();
          });
      }
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

    async uploadFace () {
      let response
      let imageData
      do {
        imageData = this.getVideoImage()
        response = await ImageService.uploadFace(imageData,'PEOPLE1','我的樹莓派')
        this.$emit('upgradeProgress',response.data.progress * 4)
      } while (response.data.progress < 25)
    }
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
