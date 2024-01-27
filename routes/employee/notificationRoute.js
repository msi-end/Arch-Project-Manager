const express = require('express');
const router = express.Router();
const notify = require('../../controllers/employee/notify.crud')


router.get('/get-notifi/:id', notify.GetNotification);
router.get('/upd-notifi/:id', notify.UpdateNotification);
// router.post('/set-notifi', notify.SetNotification);


module.exports= router;