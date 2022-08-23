const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');
const { customAlphabet } = require('nanoid');
const db = require('../config/db.config');

 const User = db.users;
// const Merchant = db.merchants;
// const Setting = db.settings;
// const Log = db.logs;

exports.getUserTasks = async (req, res) => {
 
  const userId  = req.query.user;


  try {
    
    const user = await User.findById(
      userId).select(['-password']);
    if(user == null){
      throw new Error("user not found");
    }

   var tasks = user.tasks;
  
  
   
   
   return res.json({ message: "task not found ",success: true,data:tasks  });
  }
    catch (err) {
      return res.status(400).json({ message: err.message });
    }
  
};