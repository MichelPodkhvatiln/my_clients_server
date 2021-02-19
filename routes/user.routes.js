const { authJwt } = require('../middlewares');
const controller = require('../controllers/user.controller');

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });

  app.post('/api/user/get-user', [authJwt.verifyToken], controller.getUser);

  // app.get('/api/test/all', controller.allAccess);

  // app.get('/api/test/user', [authJwt.verifyToken], controller.userBoard);
  //
  // app.get(
  //   '/api/test/master',
  //   [authJwt.verifyToken, authJwt.isMaster],
  //   controller.masterBoard
  // );

  // app.get(
  //   '/api/test/admin',
  //   [authJwt.verifyToken, authJwt.isAdmin],
  //   controller.adminBoard
  // );
};
