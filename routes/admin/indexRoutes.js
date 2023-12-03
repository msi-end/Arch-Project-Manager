const express = require('express');
const router = express.Router();
const mainController = require('../../controllers/_index.controller')

// for login and logout, auth 
// router.get('/', mainController.index);
// router.get('/user-manager', mainController.userManager);
// router.get('/finance', mainController.finance);
// router.get('/settings', mainController.settings);
router.post('/projects-create', mainController.insertNewDeal);
router.get('/np-form', mainController.renderNormalProjectForm)


module.exports = router;