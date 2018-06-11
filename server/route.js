const express=require('express');
const router=express.Router();
const signupController=require('./controller/signup');
const loginController=require('./controller/login');
const userController=require('./controller/user');
const formidable=require('formidable');
const path=require('path');
//图片上传
const multer=require('multer');
//设置图片上传路径和保存的文件名
const storage=multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,"static/images")
  },
  filename:(req,file,cb)=>{
    const fileFormat = (file.originalname).split(".");
    cb(null, file.originalname);
  }
})
const upload=multer({storage:storage});
//const upload=multer({dest:'uploads/'});

router.post('/api/register',signupController.signup);
router.post('/api/login',loginController.login);
router.post('/api/savearticle',upload.array('avatar',9),userController.saveArticle);
router.all('/api/getallarticle',userController.getAllArticle);
/*router.post('/api/saveImg',(req,res)=>{
  console.log(req.files);
    let form = new formidable.IncomingForm()
    form.parse(req, function(err, fields, files) {
    if (err) {
      return res.json({
        "code": 500,
        "message": "内部服务器错误"
      })
    }
    console.log(files);
    let extname = path.extname(files.avatar.name);
    let oldpath = files.avatar.path;
    let newpath = './public/avatar' + extname;
    let avatarName = 'avatar' + extname;
})
});*/
router.post('/api/saveImg',upload.array('avatar',9),(req,res)=>{
  console.log(req.files);
  console.log(req.body.info);
});
router.post("/api/saveloverecord",userController.saveLoveRecord);

module.exports=router;