require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const db = require('./src/config/db.config');

const server = express();

// Database
// db.sequelize.sync();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.text());
server.use(cookieParser());
server.use(cors({ origin: true, credentials: true }));
server.use('/public', express.static('public'));

 const taskRoutes = require('./src/routes/task.route');


server.use('/', taskRoutes);


const port = process.env.PORT || 3001;

server.listen(port, (err) => {
  if (err) throw err;
  console.log(`Ready on ${port}`);
});
