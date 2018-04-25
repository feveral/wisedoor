<template>
  <div id="main">
    <headers ref='headers'></headers>
    <div class="container">
      <div class="row">
        <equipment-list class="col-2"></equipment-list>
        <div class="col-8 row">
          <camera ref="camera" class="col-12"></camera>
          <upload-face-progress class="col-12"></upload-face-progress>
        </div>
        <train-menu @addFace="onAddFace()" class="col-2"></train-menu>
      </div>
    </div>
    <login-modal @loginSuccess="onLoginSuccess($event)"></login-modal>
    <button class="btn btn-primary" @click="getName()">Who am I</button>
    <router-view/>
  </div>
</template>

<script>
import Headers from '@/components/Headers'
import Camera from '@/components/Camera'
import LoginModal from '@/components/LoginModal'
import LoginService from '@/services/LoginService'
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
    async getName () {
      const name = await LoginService.identification();
      console.log(name)
    },

    onLoginSuccess (name) {
      this.$refs.headers.setUserName(name)
    },

    onAddFace () {
      this.$refs.camera.getVideoImage()
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
