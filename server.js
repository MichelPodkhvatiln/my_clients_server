const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const corsConfig = require('./config/cors.config');
const ConnectToMongoDB = require('./db/db');

ConnectToMongoDB();

const app = express();

app.use(cors(corsConfig));

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to test application.' });
});

app.post('/', (req, res) => {
  console.log(req.body);
  res.json({ message: 'test POST' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
