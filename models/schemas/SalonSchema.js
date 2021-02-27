const Schema = require('mongoose').Schema;

const SalonSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    address: {
      type: String,
      required: true,
    },
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
  },
  // masters: {
  //   type: [Schema.Types.ObjectId],
  //   ref: "masters"
  // },
});

module.exports = SalonSchema;
