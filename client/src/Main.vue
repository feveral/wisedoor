<template>
  <div id="main">
    <headers ref='headers' @logout="onLogout()"></headers>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-lg-2">
          <h5 class="mb-3 text-center big-font-size">您的設備列表</h5>
          <equipment-list ref="equipmentList"></equipment-list>
        </div>
        <div class="col-12 col-lg-8 row">
          <camera @upgradeProgress="onUpgradeProgress($event)" @notifyTrainStart="CheckModelIsTrain" ref="camera" class="col-12"></camera>
        </div>
        <train-menu @addFace="onAddFace()" class="col-12 col-lg-2"></train-menu>
        <upload-face-progress ref="progress" class="col-12 col-lg-8"></upload-face-progress>
      </div>
    </div>
    <login-modal @loginSuccess="onLoginSuccess($event)"></login-modal>
    <register-equipment-modal @registerEquipmentSuccess="onRegisterEquipmentSuccess()"></register-equipment-modal>
    <add-face-modal @addFace="onAddFace($event)"></add-face-modal>
    <router-view/>
  </div>
</template>

<script>
import Headers from '@/components/Headers'
import Camera from '@/components/Camera'
import LoginModal from '@/components/LoginModal'
import LoginService from '@/services/LoginService'
import ImageService from '@/services/ImageService'
import TrainService from '@/services/TrainService'
import TrainMenu from '@/components/TrainMenu'
import EquipmentList from '@/components/EquipmentList'
import UploadFaceProgress from '@/components/UploadFaceProgress'
import AddFaceModal from '@/components/AddFaceModal'
import RegisterEquipmentModal from '@/components/RegisterEquipmentModal'

export default {
  name: 'Main',
  components: {
    Camera,
    Headers,
    LoginModal,
    TrainMenu,
    EquipmentList,
    UploadFaceProgress,
    AddFaceModal,
    RegisterEquipmentModal
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

    onAddFace (faceArgs) {
      this.$refs.camera.uploadFace(faceArgs.faceName,faceArgs.equipmentName)
    },

    onRegisterEquipmentSuccess () {
      this.$refs.equipmentList.UpdateEquipmentList()
    },

    onUpgradeProgress (percentage) {
      this.$refs.progress.setPercentage(percentage)
    },

    async SetUserName () {
      this.$refs.headers.setUserName( (await LoginService.identification()).data.name )
    },

    async GoToLoginIfNotLogin () {
      const response = (await LoginService.identification()).data
      if (response.error) {
        this.$router.push({name:'Login'})
      }
    },

    async CheckModelIsTrain(equipmentName){
      const timerId = setInterval(checkIsTrain,500)
      const equipmentList = this.$refs.equipmentList 
      let isAlert = false
      async function checkIsTrain() {
        const isTrained = (await TrainService.checkModelIsOk(equipmentName)).data
        if(isTrained && !isAlert){
          isAlert = true
          equipmentList.UpdateEquipmentList()
          alert("臉孔處理已完成")
          clearInterval(timerId)
        }
      }
    },

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

.big-font-size {
  font-size: 25px;
}

</style>
