const express=require('express');
const router=express.Router();
const jwt=require('jsonwebtoken');
const {spawn}=require('child_process')
const Location=require('../models/Location');
const secret=process.env.SECRET;
router.post('/',(req,res)=>{
    const token=req.headers.authorization;
    const location=req.body;
    jwt.verify(token,secret,{},async(err,info)=>{
      const decodedToken=jwt.decode(token);
        try {
        await Location.create({
          user:decodedToken.id,
            ...location
          })
         return  res.status(206).json({message:'lcoation details updated succesfully'});
        } catch (error) {
          console.log(error);
         return  res.status(500).json({message:'Internal server error'})
        }
    })
  })
    router.put('/',(req,res)=>{
      const token=req.headers.authorization;
      const {locationUpdate,location}=req.body;
      jwt.verify(token,secret,{},async(err,info)=>{
          try {
          await Location.findByIdAndUpdate(locationUpdate.id,{
              ...location
            })
           return  res.status(206).json({message:'location details updated succesfully'});
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
          await Location.findByIdAndDelete(id)
           return  res.status(206).json({message:'location details deleted succesfully'});
          } catch (error) {
            console.log(error);
           return  res.status(500).json({message:'Internal server error'})
          }
      })
    })
    router.get('/',async(req,res)=>{
      
      try {
        const locationDoc=await Location.find().populate('user');
       return res.json(locationDoc);
      } catch (error) {
        console.log(error);
       return res.status(404).json({message:'error while getting the location details'})
      }
    })
    router.get('/:id',async(req,res)=>{
      const id=req.params.id;
      const token=req.headers.authorization;
      try {
        const decodedToken=jwt.decode(token);
        const locationDoc=await Location.findById(id);
        if(decodedToken.userType==='User'){
  const childPython=spawn('python',['recommendation_system.py',id,decodedToken.id]);
        }
       return res.json(locationDoc);
      } catch (error) {
        console.log(error);
       return res.status(404).json({message:'error while getting the location details'})
      }
    })

module.exports= router;