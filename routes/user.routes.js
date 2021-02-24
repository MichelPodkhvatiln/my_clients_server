const { authJwt } = require('../middlewares');
const controller = require('../controllers/user.controller');

module.exports = (app) => {
  app.post('/api/user/get-user', [authJwt.verifyToken], controller.getUser);
};
