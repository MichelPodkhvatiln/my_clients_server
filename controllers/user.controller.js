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
