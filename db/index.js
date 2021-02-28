const mongoose = require('mongoose');

mongoose.promise = global.Promise;

const UserModel = require('../models/UserModel');
const SalonModel = require('../models/SalonModel');
const ServiceModel = require('../models/ServiceModel');

const db = {
  mongoose,
  userModel: UserModel,
  salonModel: SalonModel,
  serviceModel: ServiceModel,
};

module.exports = db;
