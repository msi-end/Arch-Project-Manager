const express = require('express');
const router = express.Router();
const mainController = require('../../controllers/index.controller')

// for login and logout, auth 
router.get('/', mainController.index);
router.get('/user-manager', mainController.userManager);
router.get('/projects', mainController.Projects);
router.get('/finance', mainController.finance);
router.get('/settings', mainController.settings);


module.exports = router;