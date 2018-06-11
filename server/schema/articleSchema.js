const mongoose=require('mongoose');

const articleSchema=new mongoose.Schema({
    publisher:{
        type:String
    },
    //访问记录
    visitor:{
        type:String
    },
    article:[{ 
        //点赞用户
        likeuser:Array,
        content:{
            type:String
        },
        //发布时间
        time:{ 
            type:Date,  
            default:Date.now
        },
        //上传的文件
        file:{
            pic:Array,
            music:String
        },
        comments:Array
    }]

})

module.exports=articleSchema;