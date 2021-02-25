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
    required: true,
    enum: ['admin', 'master', 'user'],
  },
  profile: {
    firstName: {
      type: String,
      default: 'FirstName',
      validate: {
        validator: (value) => {
          return value.trim().length;
        },
        message: 'This is not a valid firstname!',
        isAsync: false,
      },
    },
    lastName: {
      type: String,
      default: 'LastName',
      validate: {
        validator: (value) => {
          return value.trim().length;
        },
        message: 'This is not a valid lastname!',
        isAsync: false,
      },
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
