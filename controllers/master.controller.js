const bcrypt = require('bcryptjs');
const db = require('../db');

const UserModel = db.userModel;
const MasterModel = db.masterModel;

function parseListMasterData(master) {
  return {
    id: master._id,
    userInfo: {
      firstName: master.user.profile.firstName,
      lastName: master.user.profile.lastName,
    },
    salonInfo: {
      id: master.salon._id,
      name: master.salon.name,
    },
  };
}

function parseDetailMasterData(master) {
  return {
    id: master._id,
    userInfo: {
      firstName: master.user.profile.firstName,
      lastName: master.user.profile.lastName,
      email: master.user.email,
    },
    salonInfo: {
      id: master.salon._id,
      name: master.salon.name,
    },
    workDays: master.workDays,
    services: master.services,
  };
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
        return parseListMasterData(masterDoc);
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

      const data = parseDetailMasterData(master);

      res.status(200).send(data);
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
        res.status(500).send({ message: masterErr });
        return;
      }

      const data = parseListMasterData(master);

      res.status(200).send(data);
    });
  });
};

exports.changeSalon = (req, res) => {
  const masterId = req.body.masterId;
  const newSalonId = req.body.salonId;

  MasterModel.findById(masterId).exec((err, master) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    master.salon = newSalonId;

    master.save((updatedMasterErr, updatedMaster) => {
      if (updatedMasterErr) {
        res.status(500).send({ message: err });
        return;
      }

      MasterModel.findById(updatedMaster._id)
        .populate('user')
        .populate('salon')
        .lean()
        .exec((masterErr, masterDoc) => {
          if (masterErr) {
            res.status(500).send({ message: err });
            return;
          }

          const data = parseDetailMasterData(masterDoc);

          res.status(200).send(data);
        });
    });
  });
};
