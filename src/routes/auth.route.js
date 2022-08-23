const express = require('express');

const router = express.Router();
const { check } = require('express-validator');

const {
  signUp, signIn, signOut, forgotPassword, resetInit, activateAccount, signInAdmin, signOutAdmin,getUsers
} = require('../controllers/auth.controller');

const {
  withAuth, withAuthAdmin, checkAuth, checkAuthAdmin,
} = require('../middlewares/auth.middleware');

// Authentication


module.exports = router;
