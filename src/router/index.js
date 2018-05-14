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
      name:'Login',
      component:Login
    },
    {
      path:'/register',
      name:'Signup',
      component:Signup
    },
    {
      path:'/index',
      name:'index',
      component:IndexPage
    }
    
  ],
  mode:"history"
})
