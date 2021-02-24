const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const db = require('./index');

const RoleModel = db.roleModel;
const UserModel = db.userModel;
const roles = db.roles;

function _createAdmin() {
  RoleModel.estimatedDocumentCount(async (err, count) => {
    if (!err && count !== 0) {
      try {
        const role = await RoleModel.findOne({ name: 'admin' }).exec();
        const user = await UserModel.findOne({ role: role._id })
          .populate('roles', '-__v')
          .exec();

        if (user) {
          return;
        }

        const admin = new UserModel({
          username: 'admin',
          email: process.env.ADMIN_EMAIL,
          profile: {
            name: {
              firstName: 'Admin',
              lastName: 'Admin',
            },
            phone: '',
          },
          password: bcrypt.hashSync(process.env.ADMIN_PASSWORD, 8),
          role: role._id,
        });

        const adminDoc = await admin.save();

        console.log(adminDoc);
        console.log('Admin was registered successfully!');
      } catch (error) {
        console.log('error', error);
      }
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
      autoIndex: process.env.NODE_ENV !== 'production',
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
