const express = require('express');
const router = express.Router();
const caController = require('../../controllers/CA/_index.controller')

router.get('/dashboard', caController.indexDeshboard)






module.exports = router;