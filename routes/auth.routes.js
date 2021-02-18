const { verifySignUp } = require('../middlewares');
const controller = require('../controllers/auth.controller');

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });

  app.post(
    '/api/auth/sign-up',
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted,
    ],
    controller.signUp
  );

  app.post('/api/auth/sign-in', controller.signIn);

  app.post('/api/auth/sign-in-by-token', controller.signInByToken);

  app.post('/api/auth/log-out', controller.logOut);
};
