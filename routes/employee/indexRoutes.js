const express = require('express');
const router = express.Router();
const empController = require('../../controllers/employee/_index.controller')

//---normal project ejs routes-----
router.get('/dashboard', empController.indexDeshboard)
//--------Misc project ejs routes-----
router.get('/dashboard/misc', empController.renderMiscProjectDashboard)

// router.get('/settings', empController.settings)






module.exports = router;