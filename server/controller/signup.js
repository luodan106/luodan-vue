const userModel=require('../model/userModel.js')

exports.signup=(req,res)=>{
    console.log(req.body.name);
    userModel.findOne({name:req.name},(err,data)=>{   //首先查看该用户名是否重复
        if(err){
            res.send({msg:err});
        }
        else if(data){
            res.send({msg:'用户名已存在'});
        }
        else{
            const newUser=new userModel(req.body);
            newUser.save((err1,data1)=>{
                if(err1){
                    res.send({msg:err1});
                }
                else{
                    res.send({msg:"保存成功"});
                }
            })
        }
    })
}