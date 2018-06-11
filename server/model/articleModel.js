const mongoose=require('mongoose');
const articleSchema=require('../schema/articleSchema');

const articleModel=mongoose.model("article",articleSchema);

module.exports=articleModel;