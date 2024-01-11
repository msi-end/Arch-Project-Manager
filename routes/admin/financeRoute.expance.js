const express = require('express');
const router = express.Router();
let expenseController = require('../../controllers/fm.expense.crud')

router.get('/finance/expenses/update/:id', expenseController.expenseUpdater);
// router.get('/finance', mainController.finance);
// router.get('/settings', mainController.settings);


module.exports = router;