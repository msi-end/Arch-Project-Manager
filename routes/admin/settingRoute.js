const express = require('express');
const router = express.Router();
const settingsMng = require('../../controllers/settingManager.crud')


router.get('/get-task', settingsMng.getTask);
router.get('/get-subtask', settingsMng.getSubtask);
router.get('/get-amountsplit', settingsMng.getAmountSplit);
router.post('/set-task', settingsMng.setTask);
router.get('/set-subtask', settingsMng.setSubtask);
router.get('/get-misc-task', settingsMng.getMiscTask);
router.get('/set-amountsplit', settingsMng.setAmountSplit);
router.post('/set-misc-task', settingsMng.setMiscTask);


module.exports = router;