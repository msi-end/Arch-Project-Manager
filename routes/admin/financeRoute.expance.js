const express = require('express');
const router = express.Router();
let expenseController = require('../../controllers/fm.expense.crud')

router.post('/add-Exps', expenseController.addExpense);
router.put('/expsUpdate/:id', expenseController.expenseUpdater);
router.get('/getExps', expenseController.GetExpensesByMonths);
router.post('/category/create', expenseController.createExpenseCategory);
router.get('/category/readAll', expenseController.getExpenseCategories);
router.get('/category/readOne/:id', expenseController.getExpenseCategoryById);
router.put('/category/update/:id', expenseController.updateExpenseCategory);
router.delete('/category/delete/:id', expenseController.deleteExpenseCategory);
router.get('/last_project/get', expenseController.getLastProjects);
router.get('/last_project/search/:search_term', expenseController.SearchLastProjects);


module.exports = router;