const express = require('express');
const router = express.Router();
const settingsMng = require('../../controllers/settingManager.crud')


router.get('/get-task', settingsMng.getTask);
router.get('/get-subtask', settingsMng.getSubtask);
router.get('/get-amountsplit', settingsMng.getAmountSplit);
router.post('/set-task', settingsMng.setTask);
router.get('/set-subtask', settingsMng.setSubtask);
router.get('/set-amountsplit', settingsMng.setAmountSplit);







module.exports = router;