const express = require('express');
const router = express.Router();
const userManager = require('../../controllers/userManager.crud')


router.get('/get-task', userManager.getTask);
router.get('/get-subtask', userManager.getSubtask);
router.get('/get-amountsplit', userManager.getAmountSplit);
router.post('/set-task', userManager.getTask);
router.get('/set-subtask', userManager.getSubtask);
router.get('/set-amountsplit', userManager.getAmountSplit);







module.exports = router;