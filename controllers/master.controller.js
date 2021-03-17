const bcrypt = require('bcryptjs');
const validator = require('validator');
const db = require('../db');

const UserModel = db.userModel;
const MasterModel = db.masterModel;
const SalonModule = db.salonModel;

function parseListMasterData(master) {
  return {
    id: master._id,
    userInfo: {
      firstName: master.user.profile.firstName,
      lastName: master.user.profile.lastName,
    },
    salonInfo: master.salon
      ? {
          id: master.salon._id,
          name: master.salon.name,
        }
      : null,
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
    salonInfo: master.salon
      ? {
          id: master.salon._id,
          name: master.salon.name,
        }
      : null,
    workDays: master.workDays,
    services: master.services,
    datesInfo: master.datesInfo ?? [],
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

exports.createMaster = (req, res) => {
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

    const salonId = req.body.salonId ? req.body.salonId : null;

    const newMaster = new MasterModel({
      user: user._id,
      salon: salonId,
    });

    newMaster.save((masterErr, master) => {
      if (masterErr) {
        res.status(500).send({ message: masterErr });
        return;
      }

      MasterModel.findById(master._id)
        .populate('user')
        .populate('salon')
        .lean()
        .exec((masterErr, masterDoc) => {
          if (masterErr) {
            res.status(500).send({ message: err });
            return;
          }

          const data = parseListMasterData(masterDoc);

          res.status(200).send(data);
        });
    });
  });
};

exports.removeMaster = (req, res) => {
  const masterId = req.params.id;

  MasterModel.findById(masterId).exec((err, master) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    master.remove((masterErr) => {
      if (masterErr) {
        res.status(500).send({ message: masterErr });
        return;
      }

      res.status(200).send(true);
    });
  });
};

exports.changeInfo = (req, res) => {
  const masterId = req.params.id;
  const newProfileInfo = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  };

  MasterModel.findById(masterId).exec((err, master) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (!master) {
      res.status(400).send({ message: 'Master not find!' });
      return;
    }

    UserModel.findByIdAndUpdate(master.user, { profile: newProfileInfo }).exec(
      (userErr) => {
        if (userErr) {
          res.status(500).send({ message: userErr });
          return;
        }

        MasterModel.findById(masterId)
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
      }
    );
  });
};

exports.changeEmail = (req, res) => {
  const masterId = req.params.id;
  const newMasterEmail = req.body.email ?? '';

  if (!validator.isEmail(newMasterEmail)) {
    res.status(400).send({ message: 'Invalid email' });
    return;
  }

  MasterModel.findById(masterId).exec((err, master) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    UserModel.findByIdAndUpdate(master.user, {
      email: newMasterEmail,
    }).exec((userErr) => {
      if (userErr) {
        res.status(500).send({ message: userErr });
        return;
      }

      MasterModel.findById(masterId)
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

exports.changePassword = (req, res) => {
  const masterId = req.params.id;
  const newMasterPassword = req.body.password ?? '';

  if (!validator.isLength(newMasterPassword, { min: 8 })) {
    res.status(400).send({ message: 'Invalid password' });
    return;
  }

  MasterModel.findById(masterId).exec((err, master) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    UserModel.findByIdAndUpdate(master.user, {
      password: bcrypt.hashSync(req.body.password, 8),
    }).exec((userErr) => {
      if (userErr) {
        res.status(500).send({ message: userErr });
        return;
      }

      MasterModel.findById(masterId)
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

exports.changeSalon = (req, res) => {
  const masterId = req.body.masterId;
  const newSalonId = req.body.salonId;

  SalonModule.findById(newSalonId).exec((salonErr, salonDoc) => {
    if (salonErr) {
      res.status(500).send({ message: salonErr });
      return;
    }

    MasterModel.findById(masterId).exec((err, master) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      master.salon = salonDoc ? newSalonId : null;

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
  });
};

exports.changeWorkDays = (req, res) => {
  const masterId = req.body.masterId;
  const newWorkDays = req.body.workDays;

  MasterModel.findById(masterId).exec((err, master) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    master.workDays = newWorkDays;

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

exports.changeServices = (req, res) => {
  const masterId = req.body.masterId;
  const newServices = req.body.services;

  MasterModel.findById(masterId).exec((err, master) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    master.services = newServices;

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

exports.addDateInfo = (req, res) => {
  const masterId = req.body.masterId;
  const day = req.body.day;
  const time = req.body.time;

  MasterModel.findById(masterId).exec((err, master) => {
    if (err || !master) {
      const status = err ? 500 : 400;
      const message = err ?? 'User not found!';

      res.status(status).send({ message });
      return;
    }

    const isValidDay = master.workDays.includes(day);

    if (!isValidDay) {
      res.status(400).send({ message: 'Invalid master workday!' });
      return;
    }

    const isInvalidTime = master.datesInfo.some(
      (dateInfo) => dateInfo.day === day && dateInfo.time === time
    );

    if (isInvalidTime) {
      res.status(400).send({ message: 'This time is already is exist!' });
      return;
    }

    const newDateInfo = {
      day,
      time,
      recordInfo: null,
    };

    master.datesInfo.push(newDateInfo);

    master.save((masterErr, updatedMaster) => {
      if (masterErr) {
        res.status(500).send({ message: masterErr });
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

exports.removeDateInfo = (req, res) => {
  const masterId = req.body.masterId;
  const dateInfoId = req.body.dateInfoId;

  MasterModel.findById(masterId).exec((err, master) => {
    if (err || !master) {
      const status = err ? 500 : 400;
      const message = err ?? 'User not found!';

      res.status(status).send({ message });
      return;
    }

    const index = master.datesInfo.findIndex((dateInfo) => {
      return String(dateInfo._id) === dateInfoId;
    });

    if (index === -1) {
      res.status(400).send({ message: 'Date info not found for this master' });
      return;
    }

    if (master.datesInfo[index].recordInfo) {
      res.status(400).send({
        message:
          'Date info has record! Remove or replace record before deleting',
      });
      return;
    }

    master.datesInfo.splice(index, 1);

    master.save((masterErr, updatedMaster) => {
      if (masterErr) {
        res.status(500).send({ message: masterErr });
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
