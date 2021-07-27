const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name:String,
  roll_number:String,
  password:String,
  room_number:String,
  hall:String,
  status:Number,
  occupant_from:{type: Date, default: Date.now},
})


module.exports = userSchema;
