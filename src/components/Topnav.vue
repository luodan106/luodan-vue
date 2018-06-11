<template>
  <div class="topnav">
    <span>欢迎<router-link to="/">{{name}}</router-link></span>
    <a @click="signout" >注销</a>
  </div>
</template>


<script>
export default({
  data(){
    const name=sessionStorage.getItem("name");
    return{
      name:name
    }
  },
  methods:{
    signout(){
      console.log("click");
      sessionStorage.removeItem("name");
      this.$router.push("/");
    }
  }
})
</script>
