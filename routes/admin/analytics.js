const express = require('express');
const router = express.Router();
const analyticsController = require('../../controllers/analytics.crud.js');

// Admin Routes
router.get('/misc', analyticsController.getDealsAnalytics);

module.exports = router;
