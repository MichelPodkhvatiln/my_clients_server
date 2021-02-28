const Schema = require('mongoose').Schema;

const ServiceSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
  },
});

module.exports = ServiceSchema;
