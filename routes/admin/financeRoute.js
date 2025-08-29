const express = require('express');
const router = express.Router();
const financeManagerController = require('../../controllers/financeManager.crud')

router.use(express.urlencoded({extended: false}))
router.use(express.json());

router.post('/update-advancepay', financeManagerController.updateNpAmountRecieved)
router.get('/get-income-expense', financeManagerController.getIncom_Exp_total)

router.put('/update-advancepay-mp', financeManagerController.updateMpAmountGot)

router.delete('/delete_misc_payment/:id', financeManagerController.deleteMisc_FinancePaymentsByID)
router.delete('/delete_normal_payment/:id', financeManagerController.deleteNormal_FinancePaymentsByID)


module.exports = router;