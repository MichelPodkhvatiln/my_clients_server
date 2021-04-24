const router = require('express').Router();
const { authJwt, verifySignUp } = require('../middlewares');
const controller = require('../controllers/user.controller');

router.post('/get-user', [authJwt.verifyToken], controller.getUser);

router.patch(
  '/updateProfile/:userId',
  [authJwt.verifyToken, verifySignUp.checkChangingAdmin],
  controller.updateProfile
);

router.patch(
  '/updateEmail/:userId',
  [
    authJwt.verifyToken,
    verifySignUp.checkChangingAdmin,
    verifySignUp.checkDuplicateEmail,
  ],
  controller.updateEmail
);

router.patch(
  '/updatePassword/:userId',
  [authJwt.verifyToken, verifySignUp.checkChangingAdmin],
  controller.updatePassword
);

module.exports = router;
