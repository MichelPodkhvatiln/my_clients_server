const router = require('express').Router();
const { authJwt, verifySignUp } = require('../middlewares');
const controller = require('../controllers/master.controller');

router.get('/get-list', controller.getList);

router.get('/get-master/:id', controller.getDetailedMasterInfo);

router.post(
  '/create',
  [verifySignUp.checkDuplicateEmail, authJwt.verifyToken, authJwt.isAdmin],
  controller.create
);

router.post(
  '/change-salon',
  [authJwt.verifyToken, authJwt.isAdmin],
  controller.changeSalon
);

router.post(
  '/change-work-days',
  [authJwt.verifyToken, authJwt.isAdmin],
  controller.changeWorkDays
);

module.exports = router;
