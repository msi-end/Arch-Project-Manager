const express = require('express');
const router = express.Router();
const settingsMng = require('../../controllers/settingManager.crud')


router.get('/get-task', settingsMng.getTask);
router.post('/set-task', settingsMng.setTask);

router.get('/get-subtask', settingsMng.getSubtask);
router.post('/set-subtask', settingsMng.setSubtask);
router.put('/upt-subtask/:id', settingsMng.updateSubtask);

router.get('/get-misc-task', settingsMng.getMiscTask);
router.post('/set-misc-task', settingsMng.setMiscTask);
router.put('/upt-misc-task/:id', settingsMng.updateMiscTask);

router.get('/get-amountsplit', settingsMng.getAmountSplit);
router.post('/set-amountsplit', settingsMng.setAmountSplit);
router.put('/upt-amountsplit/:id', settingsMng.updateAmountSplit);


module.exports = router;