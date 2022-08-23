const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const db = require('../config/db.config');

const User = db.users;

exports.isSignedIn = expressJwt({
  secret: "secret",
  algorithms: ['HS256'],
});




exports.checkAuth = async (req, res) => {
  const user = await User.findOne({
    where: {
      id: req.user.id,
    },
  });
  if (!user) {
    return res.status(401).json({
      message: 'Invalid Token',
    });
  }
  if (user.passUpdate && user.passUpdate > req.user.iat) {
    return res.status(401).json({
      message: 'Invalid Token',
    });
  }
  if (user) {
    const {
      id, name, email, phone, address, role,
    } = user;
    return res.status(200).json({
      login: true,
    
      user: {
        id,
        name,
        email,
    
      },
    });
  }
  res.clearCookie('token', {
    httpOnly: true,
    sameSite: 'none',
    secure: parseInt(process.env.COOKIESECURE, 10) === 1,
  });
  return res.status(401).json({
    message: 'Invalid Token',
  });
};


