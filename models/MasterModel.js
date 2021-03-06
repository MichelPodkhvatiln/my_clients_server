const mongoose = require('mongoose');
const MasterSchema = require('./schemas/MasterSchema');
const UserModel = require('./UserModel');

MasterSchema.post('remove', (doc) => {
  UserModel.findByIdAndRemove(doc.user).exec((err) => {
    if (err) {
      console.log(err);
    }
  });
});

const MasterModel = mongoose.model('master', MasterSchema);

module.exports = MasterModel;
