const express = require('express');
const router = express.Router();
const notify = require('../../controllers/notify.crud')


router.get('/get-notifi', notify.GetNotification);
router.post('/set-notifi', notify.SetNotification);
router.get('/upd-notifi/:id', notify.UpdateNotification);


module.exports= router;