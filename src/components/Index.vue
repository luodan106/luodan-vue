<template>
<div style="width:100%;height:100%">
  <Topnav></Topnav>
  <div class="content">
  <div class="info-column">
    <img src="../assets/images/center.png"/>
    <span class="title-font">{{name}}</span>
    <span style="text-align:left;padding-left:3rem">签名:阳光彩虹小白马</span>
  </div>
  <div class="content-container row">
  <LeftContent ></LeftContent>
  <Article></Article>
  <!--<RightContent></RightContent>-->
  </div>
  </div>
</div>
</template>

<script>
import Topnav from "./Topnav";
import LeftContent from "./LeftContent";
import RightContent from "./RightContent";
import Article from "./Article";
import axios from 'axios';

export default {
  data(){
    const name=sessionStorage.getItem("name");
    return{
      name:name
    }
  },
  components: {
    Topnav,
    LeftContent,
    RightContent,
    Article
  }
};
</script>