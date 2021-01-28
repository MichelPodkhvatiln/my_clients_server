const mongoose = require('mongoose');
const dbConfig = require('../config/db.config');

const dbPath = `mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`;
const options = {useNewUrlParser: true, useUnifiedTopology: true};

const ConnectToMongo = async () => {
    try {
        await mongoose.connect(dbPath, options);
        console.log(`Connected to database: ${dbConfig.DB}`);

    } catch (error) {
        console.error(error)
    }
}

module.exports = ConnectToMongo;