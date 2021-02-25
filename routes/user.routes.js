const router = require('express').Router();
const { authJwt } = require('../middlewares');
const controller = require('../controllers/user.controller');

router.post('/get-user', [authJwt.verifyToken], controller.getUser);

module.exports = router;
