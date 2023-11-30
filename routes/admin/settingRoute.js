const express = require('express');
const router = express.Router();
const settingControll = require('../../controllers/settingManager.crud')

console.log(settingControll)

router.get('/get-task', settingControll.getSubtask);
router.get('/get-subtask', settingControll.getSubtask);
router.get('/get-amountsplit', settingControll.getAmountSplit);
router.post('/set-task', settingControll.setTask);
router.get('/set-subtask', settingControll.setSubtask);
router.get('/set-amountsplit', settingControll.setAmountSplit);

module.exports = router;