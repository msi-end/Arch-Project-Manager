const express = require('express');
const router = express.Router();
const mainController = require('../../controllers/financeManager.crud')

// for login and logout, auth 
// router.get('/', mainController.index);
// router.get('/user-manager', mainController.userManager);
// router.get('/finance', mainController.finance);
// router.get('/settings', mainController.settings);
// router.get('/projects', mainController.Projects);


module.exports = router;