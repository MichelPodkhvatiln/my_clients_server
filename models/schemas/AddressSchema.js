const Schema = require('mongoose').Schema;
const PointSchema = require('./PointSchema');

const AddressSchema = new Schema({
  address: String,
  location: {
    type: PointSchema,
    required: true,
  },
});

module.exports = AddressSchema;
