const mongoose = require('mongoose');
const ServiceSchema = require('./schemas/ServiceSchema');

const ServiceModel = mongoose.model('service', ServiceSchema);

module.exports = ServiceModel;
