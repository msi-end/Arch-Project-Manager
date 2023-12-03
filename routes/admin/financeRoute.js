const express = require('express');
const router = express.Router();
const fControl = require('../../controllers/financeManager.crud')

router.put('/update-advancepay', fControl.updateAdvanceRecieved)


module.exports = router;