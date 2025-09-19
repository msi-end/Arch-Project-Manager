const express = require('express');
const router = express.Router();
const settingsManager = require('../../controllers/settingManager.crud')


router.get('/get-task', settingsManager.getTask);
router.post('/set-task', settingsManager.setTask);

router.get('/get-subtask', settingsManager.getSubtask);
router.post('/set-subtask', settingsManager.setSubtask);
router.put('/upt-subtask/:id', settingsManager.updateSubtask);
router.delete('/del-subtask/:id', settingsManager.deleteSubtask);

router.get('/get-misc-task', settingsManager.getMiscTask);
router.post('/set-misc-task', settingsManager.setMiscTask);
router.put('/upt-misc-task/:id', settingsManager.updateMiscTask);
router.delete('/del-misc-task/:id', settingsManager.deleteMiscTask);

router.get('/get-amountsplit', settingsManager.getAmountSplit);
router.post('/set-amountsplit', settingsManager.setAmountSplit);
router.put('/upt-amountsplit/:id', settingsManager.updateAmountSplit);
router.delete('/del-amountsplit/:id', settingsManager.deleteAmountSplit);

router.get('/get-expense-category', settingsManager.getExpCategory);
router.post('/set-expense-category', settingsManager.setExpCategory);
router.put('/upt-expense-category/:id', settingsManager.updateExpCategory);
router.delete('/del-expense-category/:id', settingsManager.deleteExpCategory);

router.get('/get-payment-methods', settingsManager.getPaymentMethods);
router.post('/set-payment-methods', settingsManager.setPaymentMethods);
router.put('/upt-payment-methods/:id', settingsManager.updatePaymentMethods);
router.delete('/del-payment-methods/:id', settingsManager.deletePaymentMethods);

router.get('/get-project-category', settingsManager.getProjectCategory);
router.post('/set-project-category', settingsManager.setProjectCategory);
router.put('/upt-project-category/:id', settingsManager.updateProjectCategory);
router.delete('/del-project-category/:id', settingsManager.deleteProjectCategory);


module.exports = router;