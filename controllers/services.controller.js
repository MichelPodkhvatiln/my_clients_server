const db = require('../db');

const ServiceModel = db.serviceModel;

exports.getList = (req, res) => {
  ServiceModel.find({})
    .lean()
    .exec((err, list) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      res.status(200).send(list);
    });
};

exports.create = (req, res) => {
  const name = req.body.name;
  const price = req.body.price;
  const comment = req.body.comment;

  const service = new ServiceModel({
    name,
    price,
    comment,
  });

  service.save((err, service) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    res.status(200).send(service);
  });
};

exports.update = (req, res) => {
  ServiceModel.findById(req.params.id).exec((err, service) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    service.set(req.body);

    service.save((err, updatedService) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      res.status(200).send(updatedService);
    });
  });
};

exports.delete = (req, res) => {
  ServiceModel.findById(req.params.id).exec((err, service) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    service.remove((serviceErr) => {
      if (serviceErr) {
        res.status(500).send({ message: serviceErr });
        return;
      }

      res.status(200).send(true);
    });
  });
};
