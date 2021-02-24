const { authJwt } = require('../middlewares');
const controller = require('../controllers/salon.controller');

module.exports = (app) => {
  app.get('/api/salon/get-list', controller.getList);

  app.post(
    '/api/salon/create',
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.create
  );

  app.patch(
    '/api/salon/update/:id',
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.update
  );

  app.delete(
    '/api/salon/delete/:id',
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.delete
  );
};
