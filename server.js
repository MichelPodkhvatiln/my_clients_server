const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const corsConfig = require('./config/cors.config');
const ConnectToMongoDB = require('./db/db');

ConnectToMongoDB();

const app = express();

app.use(cors(corsConfig));

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept'
  );
  next();
});

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/salon.routes')(app);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
