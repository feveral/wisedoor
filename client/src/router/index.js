import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/Main'
import Login from '@/page/Login'
import ClassifyResult from '@/page/ClassifyResult'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/classify-result',
      name: 'ClassifyResult',
      component: ClassifyResult
    },
    {
      path: '/',
      name: 'Main',
      component: Main,
      children:[

      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
