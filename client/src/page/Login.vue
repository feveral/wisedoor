<template>
  <div id="login" class="container">
    <h3 class="text-center mt-4">會員登入</h3>
    <div class="row justify-content-center">
      <div class="col-4 mt-2">
        <div class="form-group">
          <label for="exampleInputEmail1">電子信箱</label>
          <input v-model="email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
        </div>
        <div class="form-group mb-4">
          <label for="exampleInputPassword1">密碼</label>
          <input v-model="password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
        </div>
        <div class="row justify-content-center mt-4">
          <button class="col-6 btn btn-primary" @click="login()">登入</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import LoginService from '@/services/LoginService'

export default {
  name: 'Login' ,
  
  data () {
    return {
      email: '',
      password: ''
    }
  },

  mounted () {

  },

  methods: {

    async login (){
      const response = await LoginService.loginLocal(this.email,this.password)
      this.$router.push({name:'Main'})
    }
  }
}
</script>

<style>

.text-center {
  text-align: center;
}

</style>
