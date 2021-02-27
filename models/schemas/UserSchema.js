const validator = require('validator');
const Schema = require('mongoose').Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email',
      isAsync: false,
    },
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'user',
    enum: ['admin', 'master', 'user'],
  },
  profile: {
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

module.exports = UserSchema;
