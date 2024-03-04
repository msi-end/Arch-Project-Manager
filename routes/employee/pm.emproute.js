const express = require('express');
const router = express.Router();
const empController = require('../../controllers/employee/pm.emp')

router.get('/get-my-id-project', empController.getMyProject)


module.exports = router;