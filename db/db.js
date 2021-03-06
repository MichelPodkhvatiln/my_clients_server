const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const db = require('./index');

const UserModel = db.userModel;

function _createAdmin() {
  UserModel.findOne({ role: 'admin' }).exec((err, adminDoc) => {
    if (err) {
      console.error(err);
      return;
    }

    if (adminDoc) {
      return;
    }

    const adminUser = new UserModel({
      email: process.env.ADMIN_EMAIL,
      password: bcrypt.hashSync(process.env.ADMIN_PASSWORD, 8),
      role: 'admin',
      profile: {
        firstName: 'admin',
        lastName: 'Admin',
      },
    });

    adminUser.save((err) => {
      if (!err) {
        return;
      }

      console.error(err);
    });
  });
}

const ConnectToMongoDB = async () => {
  try {
    const dbPath = process.env.MONGODB_URL;
    const mongooseConnectOptions = {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      useCreateIndex: true,
      autoIndex: process.env.NODE_ENV !== 'production',
    };

    await mongoose.connect(dbPath, mongooseConnectOptions);
    _createAdmin();
    console.log('Connected to MongoDB.');
  } catch (err) {
    console.log(err);
  }
};

module.exports = ConnectToMongoDB;
