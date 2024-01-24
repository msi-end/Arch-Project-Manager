const express = require('express');
const router = express.Router();
let expenseController = require('../../controllers/fm.expense.crud')

router.post('/add-Exps', expenseController.addExpense);
router.put('/expsUpdate/:id', expenseController.expenseUpdater);
router.get('/getExps', expenseController.GetExpensesByMonths);


module.exports = router;