const Schema = require('mongoose').Schema;

const MasterDateInfoSchema = new Schema({
  status: {
    type: Boolean,
    required: true,
  },
  day: {
    type: Number,
    enum: [1, 2, 3, 4, 5, 6, 7],
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  recordInfo: {
    type: Schema.Types.ObjectId,
    ref: 'record',
  },
});

module.exports = MasterDateInfoSchema;
