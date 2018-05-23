import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/Main'
import Login from '@/page/Login'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    /*{
      path: '/landing',
      name: 'Landing',
      component: Landing
    },*/
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
