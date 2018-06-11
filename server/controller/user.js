const articleModel=require('../model/articleModel');


exports.saveArticle=(req,res)=>{                    //保存用户输入的短记录
    const info=JSON.parse(req.body.info);
    console.log("info:"+info);
    info.article.likeuser=[];
    articleModel.findOne({publisher:info.publisher},(err,data)=>{
        if(err){
            res.send({msg:err});
        }
        else if(!data){                            //若之前该用户未保存过短记录，添加该用户的新纪录
            const newArticle=new articleModel(info);
            console.log(newArticle);
            newArticle.save((err)=>{
                if(err){
                    res.send({msg:err});
                }
                else{
                    res.send({msg:"保存成功"});
                }
            })
        }
        else{
            data.article.push(info.article);          //该用户之前保存过短记录，更新记录即可
            articleModel.update({publisher:info.publisher},data,(err)=>{
                if(err){
                    res.send({msg:err});
                }
                else{
                    res.send({msg:"保存成功"});
                }
            });
        }
    })
}

exports.getAllArticle=(req,res)=>{
    articleModel.find((err,data)=>{                      //从数据库提取所有的短记录
        if(err){
            res.send({msg:err});
        }
        else{
            const articledata=[];
            data.map((user,index)=>{
                user.article.map((article,index)=>{
                    const info={
                        publisher:user.publisher,
                        article:article
                    }
                    articledata.push(info);
                });
            });
            articledata.sort((a,b)=>{                           //按照用户点赞数排序
                a.article.likeuser.length-b.article.likeuser.length;
            })
            res.send(articledata);                        //返回所有短文章数据
        }
    })
}

//收藏或取消收藏
exports.saveLoveRecord=(req,res)=>{
    //获取变动后的信息
    const updatedata=req.body;
    //找到对应需要修改的信息项
    articleModel.findOne({'article._id':updatedata.article._id},(err,data)=>{
        if(err){
            console.log(err);
            res.send({msg:"收藏出错"});
        }
        else{
            data.article.map((data1,index)=>{
                if(data1._id.toString()==updatedata.article._id){
                    data1.likeuser=updatedata.article.likeuser;
                }
            })
            articleModel.update({'article._id':updatedata.article._id},data,err=>{
                if(err){
                    res.send({msg:err});
                }
                else{
                    res.send({msg:"保存成功"});
                }
            })
        }
    })
}