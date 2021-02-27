const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const corsConfig = require('./config/cors.config');
const ConnectToMongoDB = require('./db/db');

ConnectToMongoDB();

const app = express();

app.use(cors(corsConfig));

app.use(bodyParser.json());

app.use(require('./middlewares/serverHeaders'));

app.use('/api', require('./routes'));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
