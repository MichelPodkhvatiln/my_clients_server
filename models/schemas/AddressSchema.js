const Schema = require('mongoose').Schema;

const AddressSchema = new Schema({
  address: String,
  coordinates: {
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number,
      required: true,
    },
  },
});

module.exports = AddressSchema;
