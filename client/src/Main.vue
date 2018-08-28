<template>
  <div id="main">
    <headers ref='headers' @logout="onLogout()" @clickAddFace="changeToCameraMode()" @clickOpenDoorRecord="changeToDoorRecordMode()" @clickEquipmentList="changeToEquipmentListMode()" @clickChangeToOnlineClassify="changeToOnlineClassifyMode()"></headers>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-lg-3" v-if="isEquipmentListShow">
          <h5 class="mb-3 text-center big-font-size">您的設備列表</h5>
          <equipment-list ref="equipmentList"></equipment-list>
        </div>
        <div class="col-12 col-lg-9 row" v-show="isCameraShow">
          <camera @upgradeProgress="onUpgradeProgress($event)" @notifyTrainStart="CheckModelIsTrain" ref="camera" class="col-12"></camera>
        </div>
        <div class="col-12 col-lg-9 row" v-if="isOpenDoorRecordShow">
          <open-record class="col-12"></open-record>
        </div>
        <!-- <train-menu @clickAddFace="changeToCameraMode()" @addFace="onAddFace()" @clickOpenDoorRecord="changeToDoorRecordMode()" v-if="isTrainMenuShow" class="col-12 col-lg-2"></train-menu> -->
      </div>
    </div>
    <login-modal @loginSuccess="onLoginSuccess($event)"></login-modal>
    <register-equipment-modal @registerEquipmentSuccess="onRegisterEquipmentSuccess()"></register-equipment-modal>
    <add-face-modal @addFace="onAddFace($event)"></add-face-modal>
    <set-equipment-password-modal></set-equipment-password-modal>
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
import SetEquipmentPasswordModal from '@/components/SetEquipmentPasswordModal'
import OpenRecord from '@/components/OpenRecord'

import Media from 'vue-media'

export default {
  name: 'Main',

  data () {
    return {
      isGreaterThan768: window.innerWidth > 768,
      isCameraShow: true,
      isTrainMenuShow: true,
      isEquipmentListShow: true,
      isOpenDoorRecordShow: false,
    }
  },

  components: {
    Camera,
    Headers,
    LoginModal,
    TrainMenu,
    EquipmentList,
    UploadFaceProgress,
    AddFaceModal,
    RegisterEquipmentModal,
    SetEquipmentPasswordModal,
    Media,
    OpenRecord
  },

  mounted () {
    this.GoToLoginIfNotLogin()
    this.SetUserName()
    this.isTrainMenuShow = this.isGreaterThan768
    this.isEquipmentListShow = this.isGreaterThan768
  },

  methods: {
    changeToCameraMode () {
      if (!this.isGreaterThan768) {
        this.isCameraShow = true
        this.isTrainMenuShow = false
        this.isEquipmentListShow = false
        this.isOpenDoorRecordShow = false
      }
      else{
        this.isCameraShow = true
        this.isTrainMenuShow = true
        this.isEquipmentListShow = true
        this.isOpenDoorRecordShow = false
      } 
      this.$refs.camera.changeToAddFaceMode()
    },

    changeToTrainMenuMode () {
      if (!this.isGreaterThan768) {
        this.isCameraShow = false
        this.isTrainMenuShow = true
        this.isEquipmentListShow = false
        this.isOpenDoorRecordShow = false
      } 
    },

    changeToEquipmentListMode () {
      if (!this.isGreaterThan768) {
        this.isCameraShow = false
        this.isTrainMenuShow = false
        this.isEquipmentListShow = true
        this.isOpenDoorRecordShow = false
      } 
    },

    changeToDoorRecordMode(){
      if (!this.isGreaterThan768) {
        this.isCameraShow = false
        this.isTrainMenuShow = false
        this.isEquipmentListShow = false
        this.isOpenDoorRecordShow = true
      }
      else{
        this.isCameraShow = false
        this.isTrainMenuShow = true
        this.isEquipmentListShow = true
        this.isOpenDoorRecordShow = true
      }
    },

    changeToOnlineClassifyMode(){
      this.changeToCameraMode()
      this.$refs.camera.changeToOnlineClassifyMode()
    },

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
      //this.$refs.progress.setPercentage(percentage)
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
