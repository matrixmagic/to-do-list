const sequelizeQuery = require('sequelize-query');
const db = require('../config/db.config');


const User = db.users;

exports.getAllUsers = async (req, res) => {
 
  try {
    const data = await User.findAll({
      ...req,
      where: {
        ...req.where,
      },
      attributes: { exclude: ['password'] },
    });
    const count = await User.count({
      ...req,
      where: {
        ...req.where,
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


