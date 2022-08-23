const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');
const { customAlphabet } = require('nanoid');
const db = require('../config/db.config');


// const User = db.users;
// const Merchant = db.merchants;
// const Setting = db.settings;
// const Log = db.logs;

