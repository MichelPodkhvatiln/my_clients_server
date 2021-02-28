const Schema = require('mongoose').Schema;

const RecordSchema = new Schema({
  master: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'master',
  },
  service: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'service',
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

module.exports = RecordSchema;
