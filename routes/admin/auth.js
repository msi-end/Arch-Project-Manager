const express = require('express');
const router = express.Router();
const adminController = require('../../controllers/adminAuth.js');

// Admin Routes
router.get('/', adminController.home);
router.get('/login', adminController.loginPage);
router.post('/auth', adminController.auth);
router.get('/logOut', adminController.logout);

module.exports = router;
