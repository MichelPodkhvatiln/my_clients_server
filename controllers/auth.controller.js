const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/auth.config.js');
const db = require('../db');

const UserModel = db.userModel;
const RoleModel = db.roleModel;

exports.signUp = async (req, res) => {
  const reqRole = req.body.role;

  if (reqRole === 'admin') {
    res
      .status(403)
      .send({ message: 'You cannot create a user with such a role' });
    return;
  }

  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const role = req.body.role;

  if (!username) {
    res.status(400).send({ message: 'Username is not entered!' });
    return;
  }

  if (!email) {
    res.status(400).send({ message: 'Email is not entered!' });
    return;
  }

  if (!password) {
    res.status(400).send({ message: 'Password is not entered!' });
    return;
  }

  const newUser = new UserModel({
    username,
    email,
    password: bcrypt.hashSync(password, 8),
  });

  try {
    const user = await newUser.save();

    if (role) {
      user.role = await RoleModel.findOne({ name: role }).exec();

      await user.save();
      res.send({
        message: `${user.role.name.toUpperCase()} was registered successfully!`,
      });
    } else {
      user.role = await RoleModel.findOne({ name: 'user' }).exec();

      await user.save();
      res.send({ message: 'User was registered successfully!' });
    }
  } catch (error) {
    await UserModel.findByIdAndDelete({ _id: newUser.id }).exec();
    res.status(500).send({ message: error });
  }
};

exports.login = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    if (!email) {
      res.status(400).send({ message: 'Email is not entered!' });
      return;
    }

    if (!password) {
      res.status(400).send({ message: 'Password is not entered!' });
      return;
    }

    const user = await UserModel.findOne({ email })
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
      id: user.id,
      username: user.username,
      email: user.email,
      role: role.name,
      accessToken: token,
    });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};
