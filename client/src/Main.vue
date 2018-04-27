<template>
  <div id="main">
    <headers ref='headers'></headers>
    <div class="container">
      <div class="row">
        <equipment-list class="col-2"></equipment-list>
        <div class="col-8 row">
          <camera @upgradeProgress="onUpgradeProgress($event)" ref="camera" class="col-12"></camera>
          <upload-face-progress ref="progress" class="col-12"></upload-face-progress>
        </div>
        <train-menu @addFace="onAddFace()" class="col-2"></train-menu>
      </div>
    </div>
    <login-modal @loginSuccess="onLoginSuccess($event)"></login-modal>
    <add-face-modal @addFaceTest="onAddFaceTest($event)"></add-face-modal>
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
import AddFaceModal from '@/components/AddFaceModal'

export default {
  name: 'Main',
  components: {
    Camera,
    Headers,
    LoginModal,
    TrainMenu,
    EquipmentList,
    UploadFaceProgress,
    AddFaceModal
  },

  mounted () {

  },

  methods: {

    onLoginSuccess (name) {
      this.$refs.headers.setUserName(name)
    },

    onAddFace () {
      this.$refs.camera.uploadFace()
    },

    onAddFaceTest (faceArgs) {
      this.$refs.camera.uploadFace(faceArgs.faceName,faceArgs.equipmentName)
    },

    onUpgradeProgress (percentage) {
      this.$refs.progress.setPercentage(percentage)
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
