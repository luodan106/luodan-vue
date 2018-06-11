<template>
<form role="form" v-on:submit.prevent="submit">
  <div class="login-div">
    <input type="text" v-model="info.name" class="form-control" placeholder="输入用户名"/>
    <input type="password" v-model="info.password" class="form-control" placeholder="输入密码"/>
    <button type="submit"  class="btn btn-primary">登录</button>
    <button  class="btn btn-primary ">
        <router-link to="/register">注册</router-link>
    </button>
  </div>
  </form>
</template>

<script>
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      info: {
        name: "",
        password: ""
      }
    };
  },

  methods: {
    //提交登陆数据
    submit() {
      const data = this.info;
      axios
        .post("/api/login", data)
        .then(res => {
          const msg=res.data.msg;
          if(msg!=="登录成功"){
            alert("登录失败："+msg);
          }
          else{
            sessionStorage.setItem("name",data.name);
            this.$router.push({path:'/index'});
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

