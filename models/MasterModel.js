const mongoose = require('mongoose');
const MasterSchema = require('./schemas/MasterSchema');

const MasterModel = mongoose.model('master', MasterSchema);

module.exports = MasterModel;
