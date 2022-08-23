const express = require('express');

const router = express.Router();

const {
  getUserTasks,signUp, signIn, signOut
} = require('../controllers/auth.controller');
router.get('/getUserTasks', getUserTasks);


module.exports = router;
