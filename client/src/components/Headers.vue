<template>
  <div id="header">
    <nav class="navbar navbar-expand-lg navbar-light bg-light mb-4">
        <a class="navbar-brand" href="#">智慧門鎖</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                    <a class="nav-link loginout-button" href="#" data-toggle="modal" data-target="#login-modal">{{ userName }}</a>
                    <a class="nav-link loginout-button" href="#" @click="logout()" v-if="isLogin">登出</a>
                </li>
            </ul>
        </div>
    </nav>
  </div>
</template>

<script>

import LoginService from '@/services/LoginService'

export default {
  name: 'Header',
  data () {
    return {
      userName: '登入',
      isLogin: false
    }
  },

  methods: {
    setUserName (name) {
      this.userName = `Hi ! ${name}`
      this.isLogin = true
    },

    logout () {
      LoginService.logout()
      this.userName = '登入'
      this.isLogin = false
    }
  }
}
</script>

<style>
#header {
   box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);
}

.loginout-button {
  display: inline-block;
}
</style>
