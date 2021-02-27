const db = require('../db');

const SalonModel = db.salonModel;

exports.getList = (req, res) => {
  SalonModel.find({})
    .lean()
    .exec((err, salons) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      res.status(200).send(salons);
    });
};

exports.create = (req, res) => {
  const name = req.body.name;
  const location = req.body.location;

  if (!name.length || !location) {
    res.status(400).send({ message: 'Invalid request data!' });
    return;
  }

  const newSalon = new SalonModel({
    name,
    location,
  });

  newSalon.save((err, salon) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    res.status(200).send(salon);
  });
};

exports.update = (req, res) => {
  SalonModel.findById(req.params.id).exec((err, salon) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    salon.set(req.body);

    salon.save((salonErr, updatedSalon) => {
      if (err) {
        res.status(500).send({ message: salonErr });
        return;
      }

      res.status(200).send(updatedSalon);
    });
  });
};

exports.delete = (req, res) => {
  SalonModel.findById(req.params.id).exec((err, salon) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    salon.remove((salonErr) => {
      if (salonErr) {
        res.status(500).send({ message: salonErr });
        return;
      }

      res.status(200).send(true);
    });
  });
};
