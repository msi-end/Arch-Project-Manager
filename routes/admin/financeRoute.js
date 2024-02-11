const express = require('express');
const router = express.Router();
const fControl = require('../../controllers/financeManager.crud')

router.use(express.urlencoded({extended: false}))
router.use(express.json());

router.put('/update-advancepay', fControl.updateNpAmountRecieved)
router.get('/get-income-expense', fControl.getIncom_Exp_total)

router.put('/update-advancepay-mp', fControl.updateMpAmountGot)

module.exports = router;