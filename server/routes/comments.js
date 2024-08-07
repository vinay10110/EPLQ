const express=require('express');
const router=express.Router();
const jwt=require('jsonwebtoken');
const Comment=require('../models/Comment')
const secret=process.env.SECRET;
router.post('/',(req,res)=>{
    const token=req.headers.authorization;
    const {text,rating,locId}=req.body;
    jwt.verify(token,secret,{},async(err,info)=>{
          try {
          await Comment.create({
            user:info.id,
              text:text,
              rating:rating,
              location:locId
            })
           return  res.status(206).json({message:'comment details posted succesfully'});
          } catch (error) {
            console.log(error);
           return  res.status(500).json({message:'Internal server error'})
          }
      })
})
router.put('/',(req,res)=>{
    const token=req.headers.authorization;
    const {id,text,rating}=req.body;
    jwt.verify(token,secret,{},async(err,info)=>{
          try {
          await Comment.findByIdAndUpdate(id,{
              text,
              rating
            },{new:true})
           return  res.status(206).json({message:'comment details posted succesfully'});
          } catch (error) {
            console.log(error);
           return  res.status(500).json({message:'Internal server error'})
          }
      })
})
router.delete('/',(req,res)=>{
    const token=req.headers.authorization;
    const {id}=req.body;
    jwt.verify(token,secret,{},async(err,info)=>{
          try {
          await Comment.findByIdAndDelete(id);
           return  res.status(206).json({message:'comment details deleted succesfully'});
          } catch (error) {
            console.log(error);
           return  res.status(500).json({message:'Internal server error'})
          }
      })
})
router.get('/',async(req,res)=>{
          try {
        const commentDoc=  await Comment.find().populate('user');
           return  res.status(206).json(commentDoc);
          } catch (error) {
            console.log(error);
           return  res.status(500).json({message:'Internal server error'})
          }
    
})
module.exports=router;