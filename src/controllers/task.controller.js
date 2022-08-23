
const db = require('../config/db.config');
const mongoose = require('mongoose');

const MongooseQueryParser = require('mongoose-query-parser');
const { tasks } = require('../config/db.config');

const parser = new MongooseQueryParser.MongooseQueryParser();


const Task = db.tasks;
const User = db.users;

exports.addTaskToUser = async (req, res) => {
  
  const userId  = req.body.user;
  const task  = req.body.task;
  

  var selectedUser = await User.findById(userId);


  

  
  try {
    if(selectedUser==null)
  throw new Error("user not found");

    var newTaskId=0;
  selectedUser.tasks.forEach(item=>{
    newTaskId=Math.max(newTaskId,item.id)
  })

    if(task ==null){
      throw new Error("bad task data");
    }
    if(newTaskId==0){
      task.id=1;
    }else{
      task.id=newTaskId+1;
    }
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          tasks: task
        }
      },).select(['-password']);
    if(user == null){
      throw new Error("user not found");
    }

    return res.json({ message: "task add to users",success: true, data:task });
  

  }
    catch (err) {
      return res.status(400).json({ message: err.message });
    }
  
};

exports.updateTask = async (req, res) => {

  const userId  = req.body.user;
  const taskId  = req.body.taskId;
   task  = req.body.task;
  try {
    if(task ==null){
      throw new Error("bad task data");
    }
    const user = await User.findById(
      userId).select(['-password']);
    if(user == null){
      throw new Error("user not found");
    }

   var tasks = user.tasks;
   var selectedTask=tasks.find(w=>w.id==taskId);
  
   if( selectedTask !=null){
    var indexOfselectedTask= tasks.indexOf(selectedTask);
    task.id=taskId;
    tasks[indexOfselectedTask]=task
    user.tasks=tasks
    user.save();
    return res.json({ message: "task updated ",success: true, data:task });
   }
   
   return res.json({ message: "task not found ",success: false,  });
  }
    catch (err) {
      return res.status(400).json({ message: err.message });
    }
  
};


exports.deleteTask = async (req, res) => {

  const userId  = req.body.user;
  const taskId  = req.body.taskId;
   task  = req.body.task;
  try {
    
    const user = await User.findById(
      userId).select(['-password']);
    if(user == null){
      throw new Error("user not found");
    }

   var tasks = user.tasks;
   var selectedTask=tasks.find(w=>w.id==taskId);
  
   if( selectedTask !=null){
    var indexOfselectedTask= tasks.indexOf(selectedTask);
    var deletedTask=tasks[indexOfselectedTask];
    tasks.splice(indexOfselectedTask,1);
    user.tasks=tasks
    user.save();
    return res.json({ message: "task deleted ",success: true, data:deletedTask });
   }
   
   return res.json({ message: "task not found ",success: true, data:deletedTask });

  }
    catch (err) {
      return res.status(400).json({ message: err.message });
    }
  
};
exports.getTaskById = async (req, res) => {
 
  const userId  = req.query.user;
  const taskId  = req.query.taskId;

  try {
    
    const user = await User.findById(
      userId).select(['-password']);
    if(user == null){
      throw new Error("user not found");
    }

   var tasks = user.tasks;
   var selectedTask=tasks.find(w=>w.id==taskId);
  
   if( selectedTask !=null){
    var indexOfselectedTask= tasks.indexOf(selectedTask);
    return res.json({ message: "task updated ",success: true, data:tasks[indexOfselectedTask] });
   }
   
   return res.json({ message: "task not found ",success: false,  });
  }
    catch (err) {
      return res.status(400).json({ message: err.message });
    }
  
};

exports.getAllUsers = async (req, res) => {
  const query = await queryParser.parse(req);
  try {
    const data = await User.findAll({
      ...query,
      where: {
        ...query.where,
      },
      attributes: { exclude: ['password'] },
    });
    const count = await User.count({
      ...query,
      where: {
        ...query.where,
      },
    });
    return res.json({ count, data });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getUserDetails = async (req, res) => {
  const { id } = req.user;
  try {
    const data = await User.findByPk(id, {
      attributes: {
        exclude: ['password'],
      },
      include: ['merchant'],
    });
    const referCount = await User.count({ where: { refferedBy: id } });
    return res.json({ ...data.dataValues, referCount });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await User.findByPk(id, {
      attributes: { exclude: ['password'] },
      include: ['merchant'],
    });
    const referCount = await User.count({ where: { refferedBy: id } });
    return res.json({ ...data.dataValues, referCount });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.countUsers = async (req, res) => {
  try {
    const data = await User.count({
      where: {
        role: 1,
      },
    });
    return res.json(data);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.updateUserAdmin = async (req, res) => {
  const { id } = req.params;

  try {
    const updateObj = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      password: req.body.password,
      role: req.body.role,
      active: req.body.active,
      kyc: req.body.kyc,
      passUpdate: req.body.password ? Math.floor(Date.now() / 1000) : undefined,
    };
    const num = await User.update(updateObj, { where: { id } });
    const ifUpdated = parseInt(num, 10);
    if (ifUpdated === 1) {
      return res.json({ message: 'User Updated' });
    }
    return res.status(500).json({ message: 'Cannot update user' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.user;

  try {
    const updateObj = {
      name: req.body.name,
      phone: req.body.phone,
      address: req.body.address,
      password: req.body.password,
      passUpdate: req.body.password ? Math.floor(Date.now() / 1000) : undefined,
    };
    const num = await User.update(updateObj, { where: { id } });
    const ifUpdated = parseInt(num, 10);
    if (ifUpdated === 1) {
      return res.json({ message: 'User Updated' });
    }
    return res.status(500).json({ message: 'Cannot update user' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const num = await User.destroy({ where: { id } });
    const ifDeleted = parseInt(num, 10);
    if (ifDeleted === 1) {
      return res.json({ message: `User Deleted with id=${id}` });
    }
    return res.status(500).json({ message: `Cannot delete User with id=${id}` });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
