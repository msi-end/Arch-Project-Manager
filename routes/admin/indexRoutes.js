const express = require('express');
const router = express.Router();
const mainController = require('../../controllers/_index.controller')

//---normal project ejs routes-----
router.get('/dashboard', mainController.adminDashboard)
router.post('/projects-create', mainController.insertNewNormalDeal );
router.get('/np-form', mainController.renderNormalProjectForm)


//--------Misc project ejs routes-----
router.get('/misc-dashboard', mainController.renderMiscProjectDashboard)
router.post('/misc-project-create', mainController.insertNewMiscDeal)

module.exports = router;