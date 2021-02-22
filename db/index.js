const mongoose = require('mongoose');

mongoose.promise = global.Promise;

const UserModel = require('../models/UserModel');
const RoleModel = require('../models/RoleModel');
const SalonModel = require('../models/SalonModel');

const db = {
  roles: ['admin', 'master', 'user'],
  mongoose,
  userModel: UserModel,
  roleModel: RoleModel,
  salonModel: SalonModel,
};

module.exports = db;
