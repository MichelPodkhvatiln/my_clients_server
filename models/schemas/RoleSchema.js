const Schema = require('mongoose').Schema;

const RoleSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = RoleSchema;
