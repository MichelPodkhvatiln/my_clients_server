const whitelist = [
  'http://localhost:8080',
  'http://app-my-clients.herokuapp.com',
  'https://app-my-clients.herokuapp.com',
];
const corsConfig = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

module.exports = corsConfig;
