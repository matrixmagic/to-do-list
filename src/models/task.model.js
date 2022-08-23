
const mongoose = require('mongoose');



const TaskSchema = new mongoose.Schema({
  id:String,
 
  heading:String,
  description: String,

  deadline: Date ,
  startDate: Date ,

  status: {
    type: String,
    enum : ['incomplete', 'completed'],
    default: 'incomplete'
  },
  priority: {
    type: String,
    enum : ['low', 'medium', 'high'],
    default: 'medium'
  },

});



const Task = mongoose.model('Task', TaskSchema);
module.exports = Task;
