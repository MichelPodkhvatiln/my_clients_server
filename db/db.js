const mongoose = require('mongoose');
const db = require('./index');
const bcrypt = require('bcryptjs');

const RoleModel = db.role;
const UserModel = db.user;
const roles = db.roles;

function _createAdmin() {
  RoleModel.estimatedDocumentCount((err, count) => {
    if (!err && count !== 0) {
      RoleModel.findOne({ name: 'admin' }, (error, role) => {
        if (error) {
          console.log('error', error);
          return;
        }

        UserModel.findOne({ role: role._id })
          .populate('roles', '-__v')
          .exec((error, user) => {
            if (error) {
              console.log('error', error);
              return;
            }

            if (user) {
              return;
            }

            const admin = new UserModel({
              username: 'admin',
              email: process.env.ADMIN_EMAIL,
              password: bcrypt.hashSync(process.env.ADMIN_PASSWORD, 8),
              role: role._id,
            });

            admin.save((error, user) => {
              if (error) {
                console.log('error', error);
                return;
              }

              console.log(user);
              console.log('Admin was registered successfully!');
            });
          });
      });
    }
  });
}

function _initial() {
  RoleModel.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      roles.forEach((role) => {
        new RoleModel({
          name: role,
        }).save((error) => {
          if (err) {
            console.log('error', error);
          }

          console.log(`added ${role} to roles collection`);
        });
      });
    }
  });
}

const ConnectToMongoDB = async () => {
  try {
    const dbPath = process.env.MONGODB_URL;
    const mongooseConnectOptions = {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    };

    await mongoose.connect(dbPath, mongooseConnectOptions);
    _initial();
    _createAdmin();
    console.log('Connected to MongoDB.');
  } catch (err) {
    console.log(err);
  }
};

module.exports = ConnectToMongoDB;
