<template>
  <div id="camera" class="row">
      <video id="video" ref="video" class="col-12" width="640" height="480" autoplay="" ></video>
      <button id="upload" @click="uploadImage();test();" class="col-3 btn btn-success">上傳圖片</button>
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
    async uploadImage(){
      const response = await ImageService.upload(this.getVideoImage())
      console.log(response)
    },
    test () {
      console.log("test")
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
