const Schema = require('mongoose').Schema;

const RecordSchema = new Schema({
  masterId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  serviceId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

module.exports = RecordSchema;
