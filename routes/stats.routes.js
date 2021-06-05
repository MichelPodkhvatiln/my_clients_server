const router = require('express').Router();
const { authJwt } = require('../middlewares');
const {
  getRecordsWeekStats,
  getRecordsMonthStats,
} = require('../controllers/stats.controller');

router.get(
  '/records-week-stats',
  [authJwt.verifyToken, authJwt.isAdmin],
  getRecordsWeekStats
);

router.get(
  '/records-month-stats',
  [authJwt.verifyToken, authJwt.isAdmin],
  getRecordsMonthStats
);

module.exports = router;
