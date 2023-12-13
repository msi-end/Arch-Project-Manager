const express = require('express');
const router = express.Router();
const mainController = require('../../controllers/_index.controller')

//---normal project ejs routes-----
router.post('/projects-create', mainController.insertNewNormalDeal );
router.get('/np-form', mainController.renderNormalProjectForm)


//--------Misc project ejs routes-----
router.post('/misc-project-create', mainController.insertNewMiscDeal)

module.exports = router;