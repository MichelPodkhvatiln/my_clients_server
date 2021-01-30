const mongoose = require('mongoose');
const dbConfig = require('../config/db.config');

const db = require('../models');
const RoleModel = db.role;

const dbPath = `mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`;
const options = {useNewUrlParser: true, useUnifiedTopology: true};

const InitiateMongoServer = async () => {
    try {
        await mongoose.connect(dbPath, options);
        console.log(`Connected to database: ${dbConfig.DB}`);
        _initial();

    } catch (error) {
        console.error(error);
        process.exit();
    }
}

function _initial() {
    RoleModel.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new RoleModel({
                name: "user"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'user' to roles collection");
            });

            new RoleModel({
                name: "moderator"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'moderator' to roles collection");
            });

            new RoleModel({
                name: "admin"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'admin' to roles collection");
            });
        }
    });
}

module.exports = InitiateMongoServer;