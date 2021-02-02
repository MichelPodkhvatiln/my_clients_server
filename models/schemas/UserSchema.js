const Schema = require('mongoose').Schema;
const ProfileSchema = require('./ProfileSchema');

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: 1,
  },
  email: {
    type: String,
    required: true,
    unique: 1,
  },
  profile: ProfileSchema,
  roles: [
    {
      type: Schema.Types.ObjectId,
      ref: 'role',
    },
  ],
});

module.exports = UserSchema;
