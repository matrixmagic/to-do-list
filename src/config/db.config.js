

const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/todoList');
 
}



const db = {};
// db.Sequelize = Sequelize;

db.users = require('../models/user.model');
db.tasks = require('../models/task.model');



module.exports = db;
