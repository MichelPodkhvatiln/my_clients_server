const mongoose = require('mongoose');

mongoose.promise = global.Promise;

const UserModel = require('../models/UserModel');
const SalonModel = require('../models/SalonModel');
const ServiceModel = require('../models/ServiceModel');
const MasterModel = require('../models/MasterModel');
const RecordModel = require('../models/RecordModel');

const db = {
  mongoose,
  userModel: UserModel,
  salonModel: SalonModel,
  serviceModel: ServiceModel,
  masterModel: MasterModel,
  recordModel: RecordModel,
};

module.exports = db;
