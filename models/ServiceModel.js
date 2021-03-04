const mongoose = require('mongoose');
const ServiceSchema = require('./schemas/ServiceSchema');
const MasterModel = require('./MasterModel');

ServiceSchema.post('remove', (doc) => {
  MasterModel.updateMany(
    { services: doc._id },
    { $pull: { services: doc._id } }
  ).exec((err) => {
    if (err) {
      console.log(err);
    }
  });
});

const ServiceModel = mongoose.model('service', ServiceSchema);

module.exports = ServiceModel;
