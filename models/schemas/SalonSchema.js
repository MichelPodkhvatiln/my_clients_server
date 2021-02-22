const Schema = require('mongoose').Schema;
const AddressSchema = require('./AddressSchema');

const SalonSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  locationInfo: {
    type: AddressSchema,
    required: true,
  },
  masters: {
    type: [Schema.Types.ObjectId],
    // ref: "master"
  },
});

module.exports = SalonSchema;
