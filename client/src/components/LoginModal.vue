<template>
  <div class="modal fade"  id="login-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">登入</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label for="exampleInputEmail1" class="ml-1">電子信箱</label>
            <input type="email" class="form-control"  v-model="email" name="email" aria-describedby="emailHelp" placeholder="E-mail">
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1" class="ml-1">密碼</label>
            <input type="password" class="form-control" v-model="password" name="password" placeholder="Password">
          </div>
          <div class="row justify-content-end mr-2">
            <button type="submit" class="btn btn-primary col-3" @click="login()">登入</button>
          </div>
          <div class="row">
            <!--<a class="nav-link col-12" id="fb-login-button" href="/auth/facebook">以Facebook登入</a>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import LoginService from '@/services/LoginService'

export default {
  name: 'LoginModal',

  data () {
    return {
      email: '',
      password: '',
      is_open: false
    }
  },

  mounted(){
    
  },

  methods: {

    async login (){
      const response = await LoginService.loginLocal(this.email,this.password)
      $('#login-modal').modal('hide')
      this.$emit('loginSuccess',response.data.name)
    },

    open () {
      if (!this.is_open) {
        
      }
    } 
  }
}
</script>

<style>
#fb-login-button {
  text-align: center;
}

</style>
