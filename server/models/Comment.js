const mongoose = require('mongoose');

const comment = new mongoose.Schema({
    text:String,
    rating:Number,
    location:{type:mongoose.Schema.Types.ObjectId,ref:'Location',required:true},
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const Comment = mongoose.model('Comment', comment);

module.exports = Comment;
