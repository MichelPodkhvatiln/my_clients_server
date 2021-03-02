const Schema = require('mongoose').Schema;
const MasterDateInfoSchema = require('./MasterDateInfoSchema');

const MasterSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  salon: {
    type: Schema.Types.ObjectId,
    ref: 'salon',
  },
  services: {
    type: [Schema.Types.ObjectId],
  },
  workDays: {
    type: [Number], // 1...7
  },
  datesInfo: {
    type: [MasterDateInfoSchema],
  },
});

module.exports = MasterSchema;
