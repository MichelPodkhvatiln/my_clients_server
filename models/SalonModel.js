const mongoose = require('mongoose');
const SalonSchema = require('./schemas/SalonSchema');
const MasterModel = require('./MasterModel');

SalonSchema.post('remove', (doc) => {
  MasterModel.updateMany({ salon: doc._id }, { $set: { salon: null } }).exec(
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );
});

const SalonModel = mongoose.model('salon', SalonSchema);

module.exports = SalonModel;
