<template>
  <div class="articleCotent col-sm-7">
      <div class="record-input">
          <!--<textarea v-model='data.inputInfo.article.content' class="input-area" placeholder="写些什么。。。">
          </textarea>-->
          <div class="input-div">
          <div class="input-area"  contenteditable="true" @input="changeText" ref="content">
          </div>
          <div class="image-container" @dragover.prevent  @drop="dropFile($event)">
                <img  v-for="(img,index) in data.picFile"  :src="img" :key="index"/>
              <input type="file" @change="addFile" style="display:none" ref="inputfile" value=''/>
              <img @click="addImage" src="../assets/images/add.png"/>
          </div>
          </div>
          <button class="btn btn-primary" @click="saveImage">提交</button>     
          <button class="btn btn-primary" >发表新文章</button>     
      </div>
      <div class="public-content">
          <div class="public-content1" @scroll="scrollData">
              <div class="article-content" v-for="(article,index) in data.articleInfo" :key="index" :name="article.article._id+index">
                 <img :src="article.article.likeuser.indexOf(data.inputInfo.publisher)>-1?'/static/images/love.png':'/static/images/nlove.png'"
                      @click="addLoveArticle"/>
                  <div style="text-align:left">
                  <img src="../assets/images/eevn0iH38X.jpg"/>
                  <router-link :to="{path:'/user/'+article.publisher}">{{article.publisher}}</router-link>
                  </div>
                  <div class="content-column" @mouseover="hoverContent" 
                      v-html="article.article.content">
                  </div>
                  <div class="content-img">
                      <img  v-for="(image,index) in article.article.file.pic" v-if="image!==''" :key="index" :src="image">
                  </div>
                  <Comments :likeuser="article.article.likeuser" :name="data.inputInfo.publisher"/>
                  </div>
                  <img v-if="data.loading" src="/static/images/loading.gif"/>
          </div>
          <div v-if="data.done" class="loadingDone">已全部加载完成</div>
      </div>
  </div>
</template>

<script>
import axios from "axios";
import Comments from "./Comments";

export default {
  created() {
    //界面组件加载完之前获取短文章记录
    this.getData();
  },
  data() {
    const name = sessionStorage.getItem("name");
    return {
      data: {
        //添加后需保存的数据
        inputInfo: {
          publisher: name,
          article: {
            id: "",
            likeuser: [],
            content: "",
            file: {
              music: "",
              pic: []
            },
            comments: []
          }
        },
        //存储显示图片的转码
        picFile: [],
        //要显示的数据
        articleInfo: [],
        //获取的所有的数据
        allArticleInfo: [],
        imageFiles: [],
        //正在加载
        loading: false,
        scrollTimes: 0,
        //提示加载完
        done:false
      }
    };
  },
  components: {
    Comments
  },
  methods: {
    /*submit() {
      axios
        .post("/api/savearticle", this.data.inputInfo)
        .then(res => {
          console.log(res);
          if (res.data.msg === "保存成功") {
            console.log("保存成功");
            console.log(this.data);
            this.getData();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },*/
    //给文章点赞
    addLoveArticle(e){
      const target=e.target;
      const id=target.parentNode.attributes[0].value.split("");
      const num=id.splice(id.length-1,1).join("");
      const _id=id.join("");
      const src=target.src;
      const type=src.indexOf(("nlove"));
      const adata=this.data.articleInfo;
      //若原已标记，则先从数据库中删除标记，改变图片；若未标记，则在数据库中添加标记
      if(type<0){
        const lovenum=adata[num].article.likeuser.indexOf(this.data.inputInfo.publisher);
        adata[num].article.likeuser.splice(lovenum,1); 
        target.src="/static/images/nlove.png";
      }else{
        console.dir(adata[num].article);
        adata[num].article.likeuser.push(this.data.inputInfo.publisher);
        target.src="/static/images/love.png";
      }
      axios
        .post("/api/saveLoveRecord",adata[num])
        .then(res=>{
          if(res.data.msg=="保存成功"){

          }
        })
        .catch(err=>{
          console.log(err);
        })
     // target.src=src.indexOf("nlove")>-1?"/static/images/love.png":"/static/images/nlove.png"
    },
    getData() {
      const date = new Date();
      const timer = date.getTime().toString();
      //获取要展示的所有的短记录,初始只展示前7条
      axios
        .get("/api/getallarticle?t=" + timer)
        .then(res => {
          //保存所有后台获取的数据
          this.data.allArticleInfo = res.data.concat();
          //保存需要第一次展示的数据
          this.data.articleInfo = res.data.splice(0, 7);
        })
        .catch(err => {
          console.log(err);
        });
    },
    hoverContent() {},
    //点击添加图片触发上传图片事件
    addImage() {
      this.$refs.inputfile.click();
    },
    //上传图片事件
    addFile(e) {
      const file = e.target.files[0];
      this.data.imageFiles.push(file);
      const imgSrc = e.target.value;
      const imgArr = imgSrc.split(".");
      const strSrc = imgArr[imgArr.length - 1].toLowerCase();
      this.showImage(file);
    },
    //从本地拖拽图片到网页中
    dropFile(e) {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      this.data.imageFiles.push(file);
      console.log(file);
      this.showImage(file);
    },
    //显示上传的图片
    showImage(file) {
      const that = this;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function(e) {
        const result = reader.result;
        that.data.picFile.push(result);
      };
    },
    //将图片上传到服务器,并将保存到数据库中
    saveImage() {
      const imagefiles = this.data.imageFiles;
      console.log(imagefiles);
      var images = new FormData();
      //const images=[];
      imagefiles.map((image, index) => {
        images.append("avatar", image);
        this.data.inputInfo.article.file.pic.push(
          "/static/images/" + image.name
        );
      });
      images.append("info", JSON.stringify(this.data.inputInfo));
      axios
        .post("/api/savearticle", images)
        .then(res => {
          console.log(res);
          if (res.data.msg === "保存成功") {
            console.log("保存成功");
            //清空输入的照片和内容
            this.$refs.content.innerHTML = "";
            // this.data.imageFiles=[];
            // this.data.inputInfo.article.content='';
            //this.data.picFile=[];
            this.data = {
              inputInfo: {
                publisher: name,
                article: {
                  id: "",
                  likeuser: [],
                  content: "",
                  file: {
                    music: "",
                    pic: []
                  }
                }
              },
              //存储显示图片的转码
              picFile: [],
              articleInfo: [],
              imageFiles: []
            };
            this.getData();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //让contenteditable=true的div有类似v-model的功能
    changeText(e) {
      this.data.inputInfo.article.content = e.target.innerHTML;
    },
    //滚动文章区域，若达到最底部，则加载新数据
    scrollData(e) {
      const target = e.target;
      if (target.scrollHeight == target.scrollTop + target.clientHeight) {
        this.data.loading = true;
        const datanum = ++this.data.scrollTimes * 7;
        const alldataLen = this.data.allArticleInfo.length;
        let index = 0;
        //判断数据剩余量，决定是否继续加载
        if (alldataLen <= datanum) {
          index = -1;
        } else if (alldataLen < datanum + 7) {
          index = alldataLen % 7;
        } else {
          index = 7;
        }
        const that=this;
        if(index>0){
          //设置两秒后loading标志消失
          setTimeout(function() {
            let arr = that.data.articleInfo;
            arr = arr.concat(that.data.allArticleInfo.splice(datanum, index));
            that.data.loading = false;
            that.data.articleInfo = arr;
          }, 2000);
      }
      //若没有数据，则提示没有数据了，且两秒后消失
            else{
            that.data.loading = false;
            that.data.done = true;
            setTimeout(function(){
              that.data.done=false;
            },2000); 
            }
      }
    }
  }
};
</script>
