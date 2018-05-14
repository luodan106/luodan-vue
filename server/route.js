const express=require('express');
const router=express.Router();
const signupController=require('./controller/signup');
const loginController=require('./controller/login');

router.post('/api/register',signupController.signup);
router.post('/api/login',loginController.login);

module.exports=router;