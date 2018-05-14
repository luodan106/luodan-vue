<template>
<form v-on:submit.prevent="submit">
  <div class="registerDiv">
      <input type="text" v-model="info.name" class="form-control" placeholder="请输入用户名"/>
      <input type="text" v-model="info.password" class="form-control" placeholder="请输入密码"/>
      <input type="text" v-model="info.email" class="form-control" placeholder="请输入邮箱"/>
      <button type="submit" class="btn btn-primary">提交</button>
  </div>
  </form>
</template>

<script>
import axios from 'axios';
import Qs from 'qs';
export default {
    data(){
        return{
            info:{
                name:'',
                password:'',
                email:''
            }
        }
    },
    methods:{
      submit(){                                 
          const url = '/api/register';
          const data=this.info;
          axios
            .post(url, data)
            /* .post(url, {
              content: ''
            }) */
            .then((res) => {
             if(res.data.msg==="保存成功"){
                 //注册成功并跳转至登录界面
                 this.$router.push({path: '/'})
             }
             else if(res.data.msg==="用户名已存在"){
                 alert("用户名重复");
             }
             else{
                 alert("保存失败："+res.data.err);
             }
            })
            .catch((err)=>{
                console.log(err);
                alert("保存失败："+err);
            })
      }
    }
}
</script>
