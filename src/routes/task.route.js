const express = require('express');

const router = express.Router();

const {
  addTaskToUser,
  updateTask,
  deleteTask,
  getTaskById
} = require('../controllers/task.controller');



router.post('/addTaskToUser', addTaskToUser);
router.put('/updateTask', updateTask);
router.delete('/deleteTask', deleteTask);
router.get('/getTaskById', getTaskById);





module.exports = router;
