const { verifySignUp } = require('../middlewares');
const controller = require('../controllers/auth.controller');

module.exports = (app) => {
  app.post('/api/auth/login', controller.login);

  app.post(
    '/api/auth/signup',
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted,
    ],
    controller.signUp
  );
};
