const express=require('express');
const {PythonShell} =require('python-shell')
require('dotenv').config();
const mongoose=require('mongoose');
const cors=require('cors')
const app=express();
const userRouter=require('./routes/users');
const locationRouter=require('./routes/locations');
const commentRoute=require('./routes/comments');
const recommendationRoute=require('./routes/recommendations')
app.use(express.json());
app.use(cors({
    origin: `${process.env.HOST_ADDRESS}`,
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Content-Length', 'X-Requested-With'],
    credentials:true
  }));
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', `${process.env.HOST_ADDRESS}`);
    next();
  });
  app.use('/users',userRouter);
  app.use('/locations',locationRouter);
  app.use('/comments',commentRoute);
  app.use('/recommendations',recommendationRoute);
mongoose.connect(`${process.env.MONGO_URL}`)
.then(console.log("connected to mongodb"))
.catch(err=>console.log(err));
app.listen(5000,()=>{
    console.log('server is running on port 5000')
})