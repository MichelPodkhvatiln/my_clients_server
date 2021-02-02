const mongoose = require('mongoose');
const db = require('./index');

const RoleModel = db.role;
const roles = db.roles;

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
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: true,
    };

    await mongoose.connect(dbPath, mongooseConnectOptions);
    _initial();
    console.log('Connected to MongoDB.');
  } catch (err) {
    console.log(err);
  }
};

module.exports = ConnectToMongoDB;
