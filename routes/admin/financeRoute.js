const express = require('express');
const router = express.Router();
const fControl = require('../../controllers/financeManager.crud')

router.put('/update-advancepay', fControl.updateNpAmountRecieved)
router.get('/get-income-expense', fControl.getIncom_Exp_total)

module.exports = router;