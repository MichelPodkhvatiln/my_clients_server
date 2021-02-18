const jwt = require('jsonwebtoken');
const config = require('../config/auth.config.js');
const db = require('../db');

const UserModel = db.userModel;
const RoleModel = db.roleModel;

const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    return res.status(403).send({ message: 'No token provided!' });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Unauthorized!' });
    }
    req.userId = decoded.id;
    next();
  });
};

const isAdmin = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.userId).exec();
    const role = await RoleModel.findById(user.role).exec();

    if (role.name === 'admin') {
      next();
      return;
    }

    res.status(403).send({ message: 'Require Admin Role!' });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const isMaster = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.userId).exec();
    const role = await RoleModel.findById(user.role).exec();

    if (role.name === 'master') {
      next();
      return;
    }

    res.status(403).send({ message: 'Require Master Role!' });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const authJwt = {
  verifyToken,
  isAdmin,
  isMaster,
};
module.exports = authJwt;
