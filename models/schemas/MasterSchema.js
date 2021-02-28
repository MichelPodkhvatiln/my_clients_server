const Schema = require('mongoose').Schema;
const MasterDateInfoSchema = require('./MasterDateInfoSchema');

const MasterSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  salonId: {
    type: Schema.Types.ObjectId,
  },
  services: {
    type: [Schema.Types.ObjectId],
  },
  datesInfo: {
    type: [MasterDateInfoSchema],
  },
});

module.exports = MasterSchema;
