const express = require('express');
const router = express.Router();
const userManager = require('../../controllers/userManager.crud')


router.get('/get-task', userManager.getTask);
router.get('/get-subtask', userManager.getSubtask);
router.get('/get-amountsplit', userManager.getAmountSplit);
router.post('/set-task', userManager.setTask);
router.get('/set-subtask', userManager.setSubtask);
router.get('/set-amountsplit', userManager.setAmountSplit);







module.exports = router;