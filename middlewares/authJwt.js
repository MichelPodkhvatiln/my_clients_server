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

const isAdmin = (req, res, next) => {
  UserModel.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    RoleModel.findOne(
      {
        _id: { $in: user.role },
      },
      (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        if (role.name === 'admin') {
          next();
          return;
        }

        res.status(403).send({ message: 'Require SuperAdmin Role!' });
      }
    );
  });
};

const isMaster = (req, res, next) => {
  UserModel.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    RoleModel.find(
      {
        _id: { $in: user.role },
      },
      (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        if (role.name === 'master') {
          next();
          return;
        }

        res.status(403).send({ message: 'Require SuperAdmin Role!' });
      }
    );
  });
};

const authJwt = {
  verifyToken,
  isAdmin,
  isMaster,
};
module.exports = authJwt;
