const db = require('../db');

const UserModel = db.userModel;
const RoleModel = db.roleModel;

exports.getUser = async (req, res) => {
  try {
    const id = req.body.id;

    if (!id) {
      res.status(400).send({ message: 'UserID is not entered!' });
      return;
    }

    const user = await UserModel.findById({ _id: id })
      .populate('roles', '-__v')
      .exec();

    if (!user) {
      res.status(404).send({ message: 'User Not found.' });
      return;
    }

    const userRoleId = user.role;
    const role = await RoleModel.findById({ _id: userRoleId }).exec();

    res.status(200).send({
      username: user.username,
      email: user.email,
      role: role.name,
    });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

exports.allAccess = (req, res) => {
  res.status(200).send('Public Content.');
};

exports.userBoard = (req, res) => {
  res.status(200).send('User Content.');
};

exports.adminBoard = (req, res) => {
  res.status(200).send('Admin Content.');
};

exports.masterBoard = (req, res) => {
  res.status(200).send('Master Content.');
};
