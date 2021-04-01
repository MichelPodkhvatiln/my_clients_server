const db = require('../db');

const RecordModel = db.recordModel;
const MasterModel = db.masterModel;

exports.addRecord = (req, res) => {
  const dateInfoId = req.body.dateInfoId;
  const masterId = req.body.masterInfo.masterId;

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
  const date = req.body.date;

  MasterModel.findById(masterId).exec((err, master) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (!master) {
      res.status(400).send({ message: 'Master not found!' });
      return;
    }

    const dateInfo = master.datesInfo.find(
      (dateInfo) => String(dateInfo._id) === dateInfoId
    );

    if (!dateInfo) {
      res.status(400).send({ message: 'Date info not found!' });
      return;
    }

    const recordData = new RecordModel({
      salonInfo,
      masterInfo,
      serviceInfo,
      userInfo,
      date,
    });

    recordData.save((recordErr, record) => {
      if (recordErr) {
        res.status(500).send({ message: err });
        return;
      }

      if (!dateInfo.recordInfo) {
        dateInfo.recordInfo = [record._id];
      } else {
        dateInfo.recordInfo.push(record._id);
      }

      master.save((masterErr, updatedMaster) => {
        if (masterErr) {
          res.status(500).send({ message: err });
          return;
        }

        res.status(200).send(updatedMaster);
      });
    });
  });
};
