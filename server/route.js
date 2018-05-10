const express=require('express');
const router=express.Router();

router.get('/api/register',function(req,res){
    console.log('注册');
})

module.exports=router;