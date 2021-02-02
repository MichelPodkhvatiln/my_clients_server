const mongoose = require('mongoose');

mongoose.promise = global.Promise;

const UserModel = require('../models/UserModel');
const RoleModel = require('../models/RoleModel');

const db = {
  roles: ['user', 'master', 'admin', 'superAdmin'],
  mongoose,
  user: UserModel,
  role: RoleModel,
};

module.exports = db;
