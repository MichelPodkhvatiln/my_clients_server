const routes = require('express').Router();

routes.use('/auth', require('./auth.routes'));
routes.use('/user', require('./user.routes'));
routes.use('/salon', require('./salon.routes'));
routes.use('/services', require('./services.routes'));
routes.use('/master', require('./master.route'));

module.exports = routes;
