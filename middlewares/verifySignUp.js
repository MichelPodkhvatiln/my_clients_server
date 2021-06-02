const db = require('../db');

const UserModel = db.userModel;

const checkDuplicateEmail = (req, res, next) => {
  UserModel.findOne({ email: req.body.email }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user) {
      res.status(400).send({ message: 'Failed! Email is already in use!' });
      return;
    }

    next();
  });
};

const checkAddingAdmin = (req, res, next) => {
  if (req.body.role === 'admin') {
    res.status(403).send({
      message: 'Forbidden! You cannot create a user with such a role',
    });
    return;
  }

  next();
};

const checkChangingAdmin = (req, res, next) => {
  UserModel.findById(req.params.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: `DB error: ${err}` });
      return;
    }

    if (user?.role === 'admin') {
      res.status(403).send({
        message: 'Forbidden! You cannot change a user with such a role',
      });
      return;
    }

    next();
  });
};

const verifySignUp = {
  checkDuplicateEmail,
  checkAddingAdmin,
  checkChangingAdmin,
};

module.exports = verifySignUp;
