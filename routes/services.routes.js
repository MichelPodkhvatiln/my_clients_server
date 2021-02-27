const router = require('express').Router();
const { authJwt } = require('../middlewares');
const controller = require('../controllers/services.controller');

router.get('/get-list', controller.getList);

router.post(
  '/create',
  [authJwt.verifyToken, authJwt.isAdmin],
  controller.create
);

router.patch(
  '/update/:id',
  [authJwt.verifyToken, authJwt.isAdmin],
  controller.update
);

router.delete(
  '/delete/:id',
  [authJwt.verifyToken, authJwt.isAdmin],
  controller.delete
);

module.exports = router;
