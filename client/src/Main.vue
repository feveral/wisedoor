<template>
  <div id="main">
    <headers ref='headers'></headers>
    <div class="container">
      <div class="row">
        <equipment-list class="col-2"></equipment-list>
        <div class="col-8 row">
          <camera ref="camera" class="col-12"></camera>
          <upload-face-progress ref="progress" class="col-12"></upload-face-progress>
        </div>
        <train-menu @addFace="onAddFace()" class="col-2"></train-menu>
      </div>
    </div>
    <login-modal @loginSuccess="onLoginSuccess($event)"></login-modal>
    <router-view/>
  </div>
</template>

<script>
import Headers from '@/components/Headers'
import Camera from '@/components/Camera'
import LoginModal from '@/components/LoginModal'
import LoginService from '@/services/LoginService'
import ImageService from '@/services/ImageService'
import TrainMenu from '@/components/TrainMenu'
import EquipmentList from '@/components/EquipmentList'
import UploadFaceProgress from '@/components/UploadFaceProgress'

export default {
  name: 'Main',
  components: {
    Camera,
    Headers,
    LoginModal,
    TrainMenu,
    EquipmentList,
    UploadFaceProgress
  },

  mounted () {

  },

  methods: {

    onLoginSuccess (name) {
      this.$refs.headers.setUserName(name)
    },

    async onAddFace () {
      let response
      let imageData
      do {
        imageData = this.$refs.camera.getVideoImage()
        response = await ImageService.uploadFace(imageData,'PEOPLE1','我的樹莓派')
        this.$refs.progress.setPercentage(response.data.progress * 4)
      } while (response.data.progress < 25)
    }
  }
}
</script>

<style>
#main {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
