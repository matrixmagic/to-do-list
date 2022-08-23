
const mongoose = require('mongoose');
const Task = require('./task.model');



const UserSchema = new mongoose.Schema({
  id:String,
  name: String,
  email:String,
  phone:String,
  password:String,
  tasks: []
  


});

const User = mongoose.model('User', UserSchema);
module.exports = User;
