import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Signup from '@/components/Signup'
import IndexPage from '@/components/Index'

Vue.use(Router)  

export default new Router({
  routes: [
    {
      path:'/',
      component:Login
    },
    {
      path:'/register',
      component:Signup
    },
    {
      path:'/index',
      component:IndexPage
    },
    {
      path:'/user/:username',
      component:IndexPage
    }
    
  ],
  mode:"history"
})
