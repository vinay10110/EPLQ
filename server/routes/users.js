const express=require('express');
const router=express.Router();
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const User=require('../models/User');
const salt=bcrypt.genSaltSync(10);
const secret=process.env.SECRET;
router.post('/register',async(req,res)=>{
    const {name,email,password,type}=req.body;
    try {
        await User.create({
          name,
          email,
          password:bcrypt.hashSync(password,salt),
          type,
      })
     return  res.status(201).json({message:'created succesfull'})
      
        
    } catch (error) {
      if (error.code === 11000) {
        return res.status(302).json({ message: 'Email already registered' });
    } else {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
    }
    })
    router.post('/login', async (req, res) => {
      const { email, password,type } = req.body;
      try {
          const userDoc = await User.findOne({ email });
          if (!userDoc) {
              return res.status(404).json({ message: 'User not found' });
          }
          const passOk = bcrypt.compareSync(password, userDoc.password);
          if (!passOk) {
              return res.status(401).json({ message: 'Password incorrect' });
          }
          if (userDoc.type !== type) {
              return res.status(406).json({ message: 'The given email did not register with the given type' });
          }
          const id = userDoc.id;
          const userType = userDoc.type;
          const token = jwt.sign({ email, id,userType }, secret, { expiresIn: '1h' });
          return res.status(200).json({ token });
      } catch (error) {
          console.error(error);
          return res.status(500).json({ message: 'Internal server error' });
      }
  });
    router.put('/profile',(req,res)=>{
      const token=req.headers.authorization;
      const {name,password}=req.body;
      jwt.verify(token,secret,{},async(err,info)=>{
          try {
            const decodedToken=jwt.decode(token);

        const userDoc=  await User.findByIdAndUpdate(decodedToken.id,{
              name,
              password:bcrypt.hashSync(password,salt),
            },{ new: true })
           return  res.status(206).json({message:'profile details updated succesfully',userDoc});
          } catch (error) {
            console.log(error);
           return  res.status(500).json({message:'Internal server error'})
          }
      })
    })

    router.put('/profile/image',(req,res)=>{
      const token=req.headers.authorization;
      const {image}=req.body;
      
      jwt.verify(token,secret,{},async(err,info)=>{
        const decodedToken=jwt.decode(token);
       try{
       const userDoc=  await User.findByIdAndUpdate(decodedToken.id,{
          imageData:image
         },{new:true})
         return res.status(206).json({message:'image updated succesfully',userDoc});
        } catch (error) {
          console.log(error);
          return res.status(500).json({message:'Internal server error'})
        }
      })
     })
    router.get('/profile',async(req,res)=>{
      const token=req.headers.authorization;
      try {
        const decodedToken=jwt.decode(token)
        const email=decodedToken.email;
        const userDoc=await User.find({email});
       return res.json(userDoc);
      } catch (error) {
        console.log(error);
       return res.status(404).json({message:'error while getting the profile details'})
      }
    })
module.exports= router;