const validator = require('validator');
const Schema = require('mongoose').Schema;

const RecordSchema = new Schema({
  salonInfo: {
    name: {
      type: String,
      required: true,
    },
  },
  masterInfo: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
  },
  serviceInfo: {
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
  },
  userInfo: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      validate: {
        validator: validator.isMobilePhone,
        message: '{VALUE} is not a valid lastname!',
        isAsync: false,
      },
    },
  },
});

module.exports = RecordSchema;
