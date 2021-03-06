const mongoose = require('mongoose');
const RecordSchema = require('./schemas/RecordSchema');

const RecordModel = mongoose.model('record', RecordSchema);

module.exports = RecordModel;
