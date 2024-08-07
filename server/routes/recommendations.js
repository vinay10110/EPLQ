const express=require('express');
const router=express.Router();
const jwt=require('jsonwebtoken');
const Recommend=require('../models/Recommend')
router.get('/',async(req,res)=>{
    const token=req.headers.authorization;
    try {
        const decodedToken=jwt.decode(token);
         const recommendDoc=await Recommend.find({userId:decodedToken.id}).populate('recommendations');
         return res.json(recommendDoc);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Internal server error'})
    }
})
module.exports=router;
