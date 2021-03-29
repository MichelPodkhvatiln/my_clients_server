const db = require('../db');

const RecordModel = db.recordModel;

exports.addRecord = (req, res) => {
  const salonInfo = {
    name: req.body.salonInfo.name,
  };
  const masterInfo = {
    firstName: req.body.masterInfo.firstName,
    lastName: req.body.masterInfo.lastName,
  };
  const serviceInfo = {
    name: req.body.serviceInfo.name,
    price: req.body.serviceInfo.price,
    comment: req.body.serviceInfo.comment,
  };
  const userInfo = {
    firstName: req.body.userInfo.firstName,
    lastName: req.body.userInfo.lastName,
    phone: req.body.userInfo.phone,
  };

  res.status(200).send({
    salonInfo,
    masterInfo,
    serviceInfo,
    userInfo,
  });
};
