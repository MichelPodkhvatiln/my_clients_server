const { authJwt } = require('../middlewares');
const controller = require('../controllers/salon.controller');

module.exports = (app) => {
  app.get('/api/salon/get-all', controller.getAllSalons);

  app.post(
    '/api/salon/create',
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.createSalon
  );
};
