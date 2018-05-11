<template>
  <div id="main">
    <headers ref='headers' @logout="onLogout()"></headers>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-lg-2">
          <h5 class="mb-3 text-center">您的設備列表</h5>
          <equipment-list></equipment-list>
        </div>
        <div class="col-12 col-lg-8 row">
          <camera @upgradeProgress="onUpgradeProgress($event)" ref="camera" class="col-12"></camera>
        </div>
        <train-menu @addFace="onAddFace()" class="col-12 col-lg-2"></train-menu>
        <upload-face-progress ref="progress" class="col-12 col-lg-8"></upload-face-progress>
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
    this.GoToLoginIfNotLogin()
    this.SetUserName()
  },

  methods: {

    onLoginSuccess (name) {
      this.$refs.headers.setUserName(name)
    },
    
    onLogout () {
      this.GoToLoginIfNotLogin()
    },

    onAddFace () {
      this.$refs.camera.uploadFace()
    },

    onAddFaceTest (faceArgs) {
      this.$refs.camera.uploadFace(faceArgs.faceName,faceArgs.equipmentName)
    },

    onUpgradeProgress (percentage) {
      this.$refs.progress.setPercentage(percentage)
    },

    async SetUserName () {
      this.$refs.headers.setUserName( (await LoginService.identification()).data.name )
    },

    async GoToLoginIfNotLogin () {
      const response = (await LoginService.identification()).data
      console.log(response)
      if (response.error) {
        this.$router.push({name:'Login'})
      } 
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

.text-center {
  text-align: center;
}

</style>
