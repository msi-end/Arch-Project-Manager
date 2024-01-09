const express = require('express');
const router = express.Router();
const mainController = require('../../controllers/_index.controller')

// ----index pages-----
//---normal project ejs routes-----
router.get('/dashboard', mainController.indexDeshboard)
router.get('/user-manager', mainController.userManager)
router.get('/settings', mainController.settings)
router.get('/finance', mainController.renderNormalProjectFinance )
router.get('/finance/expenses', mainController.expense )
router.get('/np-form', mainController.renderNormalProjectForm)
router.post('/projects-create', mainController.insertNewNormalDeal );


//--------Misc project ejs routes-----
router.get('/dashboard/misc', mainController.renderMiscProjectDashboard)
router.get('/finance/misc', mainController.miscProjectFinance)
router.post('/misc-project-create', mainController.insertNewMiscDeal)

module.exports = router;