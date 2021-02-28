const bcrypt = require('bcryptjs');
const db = require('../db');

const UserModel = db.userModel;
const MasterModel = db.masterModel;

function removeUser(userId, res) {
  UserModel.findById(userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    user.remove((userErr) => {
      if (userErr) {
        res.status(500).send({ message: userErr });
        return;
      }

      res.status(200).send({ message: 'User deleted!' });
    });
  });
}

exports.getList = (req, res) => {
  MasterModel.find({})
    .populate('user')
    .populate('salon')
    .lean()
    .exec((err, mastersList) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      const formattedList = mastersList.map((masterDoc) => {
        return {
          id: masterDoc._id,
          userInfo: {
            firstName: masterDoc.user.profile.firstName,
            lastName: masterDoc.user.profile.lastName,
          },
          salonInfo: {
            name: masterDoc.salon.name,
          },
        };
      });

      res.status(200).send(formattedList);
    });
};

exports.getDetailedMasterInfo = (req, res) => {
  MasterModel.findById(req.params.id)
    .populate('user')
    .populate('salon')
    .lean()
    .exec((err, master) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      res.status(200).send(master);
    });
};

exports.create = (req, res) => {
  const newUserData = {
    email: req.body.email,
    password: req.body.password
      ? bcrypt.hashSync(req.body.password, 8)
      : undefined,
    role: 'master',
    profile: {
      firstName: req.body.firstName ? req.body.firstName : 'MasterFirstName',
      lastName: req.body.lastName ? req.body.lastName : 'MasterLastName',
    },
  };

  const newUser = new UserModel(newUserData);

  newUser.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    const salonId = req.body.salonId ? req.body.salonId : undefined;

    const newMaster = new MasterModel({
      user: user._id,
      salon: salonId,
    });

    newMaster.save((masterErr, master) => {
      if (masterErr) {
        removeUser(user._id, res);
        res.status(500).send({ message: masterErr });
        return;
      }

      res.status(200).send(master);
    });
  });
};
