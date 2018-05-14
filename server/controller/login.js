const userModel=require('../model/userModel');

exports.login=(req,res)=>{
    console.log(req.body);
    const info=req.body;
    userModel.findOne({name:info.name,password:info.password},(err,data)=>{
        if(err){
            console.log(err);
            res.send({msg:err});
        }
        else if(data.length===0){
            res.send({msg:"用户名或密码错误"});
        }
        else{
            res.send({msg:'登录成功'});
        }
    })
}