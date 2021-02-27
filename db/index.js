const mongoose = require('mongoose');

mongoose.promise = global.Promise;

const UserModel = require('../models/UserModel');
const SalonModel = require('../models/SalonModel');

const db = {
  mongoose,
  userModel: UserModel,
  salonModel: SalonModel,
};

module.exports = db;
