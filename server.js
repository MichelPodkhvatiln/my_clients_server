const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const ConnectToMongo = require('./db/connect');

ConnectToMongo();

const app = express();

const corsOptions = {
    origin: "http://localhost:8080"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.json({message: "Welcome to test-rest-api-db application."});
});

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});