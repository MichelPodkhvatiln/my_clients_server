const router = require('express').Router();
const controller = require('../controllers/record.controller');

router.post('/add-record', controller.addRecord);

module.exports = router;
