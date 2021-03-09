const Schema = require('mongoose').Schema;

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
  services: [
    {
      type: Schema.Types.ObjectId,
      ref: 'service',
    },
  ],
  workDays: {
    type: [Number], // 1...7
  },
  datesInfo: {
    type: [
      {
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
      },
    ],
  },
});

module.exports = MasterSchema;
