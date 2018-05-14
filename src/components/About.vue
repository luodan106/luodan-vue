<template>
<div>
  <router-link to="/index">index</router-link>
  <router-link to="/hello">hello</router-link>
  
       <a href="/index">
         index
       </a>
   <ul>
     <li>
       <a href="/about">
         AboutM
       </a>
       </li>
       <li>
       <a href="/index">
         index
       </a>
       </li>
   </ul>

    <router-view/>
</div>
</template>


<script>
export default {
  name: 'About',
  data () {
    return {
      msg: 'Welcome to come here'
    }
  }
}
</script>
