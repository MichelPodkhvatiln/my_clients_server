const validator = require('validator');
const db = require('../db');

const UserModel = db.userModel;

exports.getUser = (req, res) => {
  UserModel.findById({ _id: req.body.id }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (!user) {
      res.status(404).send({ message: 'User Not found.' });
      return;
    }

    res.status(200).send({
      id: user.id,
      email: user.email,
      profile: user.profile,
      role: user.role,
    });
  });
};

exports.updateProfile = (req, res) => {
  const userId = req.params.userId;

  if (!Object.keys(req.body).length) {
    res.status(400).send({ message: 'Empty body of request!' });
    return;
  }

  if (!req.body.field?.length || !req.body.value?.length) {
    res.status(400).send({ message: 'Empty required field of request!' });
    return;
  }

  UserModel.findById(userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: `DB error: ${err}` });
      return;
    }

    if (!user) {
      res.status(400).send({ message: 'User not found!' });
      return;
    }

    if (!Object.keys(user.profile).includes(req.body.field)) {
      res.status(400).send({ message: 'Unknown user profile field!' });
      return;
    }

    if (
      req.body.field === 'phone' &&
      !validator.isMobilePhone(req.body.value, 'uk-UA', { strictMode: true })
    ) {
      res.status(400).send({ message: 'Invalid phone number!' });
      return;
    }

    user.profile[req.body.field] = req.body.value;

    user.save((userErr, updatedUser) => {
      if (err) {
        res.status(500).send({ message: `DB error: ${userErr}` });
        return;
      }

      res.status(200).send(updatedUser);
    });
  });
};
