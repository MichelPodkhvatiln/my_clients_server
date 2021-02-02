const Schema = require('mongoose').Schema;

const NameSchema = new Schema({
  firstName: String,
  lastName: String,
});

module.exports = NameSchema;
