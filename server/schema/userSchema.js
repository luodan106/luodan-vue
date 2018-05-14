const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    //用户名
    name:{
        type:String
    },
    //密码
    password:{
        type:String
    },
    //邮箱
    email:{
        type:String
    }
})

module.exports=userSchema;