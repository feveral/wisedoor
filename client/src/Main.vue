<template>
  <div id="main">
    <!-- <img src="./assets/logo.png"> -->
    <headers></headers>
    <camera></camera>
    <login-modal></login-modal>
    <button class="btn btn-primary" @click="getName()">Who am I</button>
    <router-view/>
  </div>
</template>

<script>
import Headers from '@/components/Headers'
import Camera from '@/components/Camera'
import LoginModal from '@/components/LoginModal'
import LoginService from '@/services/LoginService'

export default {
  name: 'Main',
  components: {
    Camera,
    Headers,
    LoginModal
  },
  methods: {
    async getName () {
      const name = await LoginService.identification();
      console.log(name)
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
