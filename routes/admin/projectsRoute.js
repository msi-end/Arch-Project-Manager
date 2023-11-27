const express = require('express');
const router = express.Router();
const dataFun = require('../../controllers/nproject')

router.get('/nproject-details', dataFun.gettaskDetails )

module.exports = router;