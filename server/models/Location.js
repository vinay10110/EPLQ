const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  country: { type: String, required: true },
  state: { type: String, required: true },
  district: { type: String, required: true }
});
const tagsSchema=new mongoose.Schema({
  name:{
    type:String
  }
})
const locationSchema = new mongoose.Schema({
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  address: { type:addressSchema, required: true },
  openingTime: { type: String, required: true },
  closingTime: { type: String, required: true },
  contactPhone: { type: String },
  contactEmail: { type: String },
  contactWebsite: { type: String },
  tags: { type: [tagsSchema] },
  imageURLs: { type: [String], required: true },
  additionalNotes: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
