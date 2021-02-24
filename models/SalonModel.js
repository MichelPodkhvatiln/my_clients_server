const mongoose = require('mongoose');
const SalonSchema = require('./schemas/SalonSchema');

const SalonModel = mongoose.model('salon', SalonSchema);

module.exports = SalonModel;
