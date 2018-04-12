<template>
  <div id="camera" class="row">
      <video ref="video" class="col-12" width="640" height="480" autoplay="" ></video>
  </div>
</template>

<script>
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

  methods:{
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
    }
  }
}
</script>

<style>
#camera {
  text-align: center;
}
</style>
