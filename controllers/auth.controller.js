const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/auth.config.js');
const db = require('../db');

const UserModel = db.user;
const RoleModel = db.role;

exports.signup = (req, res) => {
  if (req.body.role === 'admin') {
    res
      .status(403)
      .send({ message: 'You cannot create a user with such a role' });
    return;
  }

  const user = new UserModel({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (req.body.role) {
      RoleModel.findOne(
        {
          name: req.body.role,
        },
        (err, role) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          user.role = role._id;
          user.save((err) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({ message: 'User was registered successfully!' });
          });
        }
      );
    } else {
      RoleModel.findOne({ name: 'user' }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        user.role = role._id;
        user.save((err) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ message: 'User was registered successfully!' });
        });
      });
    }
  });
};

exports.signin = async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    if (!username) {
      res.status(400).send({ message: 'Username is not entered!' });
      return;
    }

    if (!password) {
      res.status(400).send({ message: 'Password is not entered!' });
      return;
    }

    const user = await UserModel.findOne({ username })
      .populate('roles', '-__v')
      .exec();

    if (!user) {
      res.status(404).send({ message: 'User Not found.' });
      return;
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
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

    const userRoleId = user.role;
    const role = await RoleModel.findById({ _id: userRoleId }).exec();

    res.status(200).send({
      id: user._id,
      username: user.username,
      email: user.email,
      role: role.name,
      accessToken: token,
    });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};
