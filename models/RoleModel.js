const mongoose = require('mongoose');
const RoleSchema = require('./schemas/RoleSchema');

const RoleModel = mongoose.model('role', RoleSchema);

module.exports = RoleModel;
