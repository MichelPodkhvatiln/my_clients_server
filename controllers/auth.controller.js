const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/auth.config.js');
const db = require('../db');

const UserModel = db.userModel;

exports.signUp = (req, res) => {
  const newUserData = {
    email: req.body.email,
    password: req.body.password
      ? bcrypt.hashSync(req.body.password, 8)
      : undefined,
    role: req.body.role ? req.body.role : 'user',
    profile: {
      firstName: req.body.firstName ? req.body.firstName : 'FirstName',
      lastName: req.body.lastName ? req.body.lastName : 'LastName',
    },
  };

  const newUser = new UserModel(newUserData);

  newUser.save((err) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    res.status(200).send({ message: 'User was registered successfully!' });
  });
};

exports.login = async (req, res) => {
  const credentials = {
    email: req.body.email,
    password: req.body.password,
  };

  UserModel.findOne({ email: credentials.email }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (!user) {
      res.status(404).send({ message: 'User Not found.' });
      return;
    }

    const passwordIsValid = bcrypt.compareSync(
      credentials.password,
      user.password
    );

    if (!passwordIsValid) {
      res.status(401).send({
        accessToken: null,
        message: 'Invalid Password!',
      });
      return;
    }

    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400, // 24 hours
    });

    res.status(200).send({
      id: user.id,
      email: user.email,
      profile: user.profile,
      role: user.role,
      accessToken: token,
    });
  });
};
