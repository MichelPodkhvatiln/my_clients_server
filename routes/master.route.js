const router = require('express').Router();
const { authJwt, verifySignUp } = require('../middlewares');
const controller = require('../controllers/master.controller');

router.get('/get-list', controller.getList);

router.get('/get-master/:id', controller.getDetailedMasterInfo);

router.post(
  '/create',
  [verifySignUp.checkDuplicateEmail, authJwt.verifyToken, authJwt.isAdmin],
  controller.createMaster
);

router.delete(
  '/remove/:id',
  [authJwt.verifyToken, authJwt.isAdmin],
  controller.removeMaster
);

router.patch(
  '/change-info/:id',
  [authJwt.verifyToken, authJwt.isAdmin],
  controller.changeInfo
);

router.patch(
  '/change-email/:id',
  [verifySignUp.checkDuplicateEmail, authJwt.verifyToken, authJwt.isAdmin],
  controller.changeEmail
);

router.patch(
  '/change-password/:id',
  [authJwt.verifyToken, authJwt.isAdmin],
  controller.changePassword
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

router.post(
  '/change-services',
  [authJwt.verifyToken, authJwt.isAdmin],
  controller.changeServices
);

router.post(
  '/add-date-info',
  [authJwt.verifyToken, authJwt.isAdmin],
  controller.addDateInfo
);

router.delete(
  '/remove-date-info',
  [authJwt.verifyToken, authJwt.isAdmin],
  controller.removeDateInfo
);

module.exports = router;
