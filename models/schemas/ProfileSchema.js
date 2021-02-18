const Schema = require('mongoose').Schema;
const NameSchema = require('./NameSchema');

// TODO add avatar field
const ProfileSchema = new Schema({
  name: NameSchema,
  phone: String,
});

module.exports = ProfileSchema;
