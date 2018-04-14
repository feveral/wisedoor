<template>
  <div id="main">
    <!-- <img src="./assets/logo.png"> -->
    <headers></headers>
    <camera></camera>
    <router-view/>
  </div>
</template>

<script>
import Headers from '@/components/Headers'
import Camera from '@/components/Camera'

export default {
  name: 'Main',
  components:{
    Camera,
    Headers
  }
}
</script>

<style>
#main {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
