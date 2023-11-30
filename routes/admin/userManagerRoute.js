const express = require('express');
const router = express.Router();
const userManager = require('../../controllers/userManager.crud')


router.post('/add-User', userManager.add);
router.get('/getOne-User/:id', userManager.getOne);
router.delete('/del-User/:id', userManager.Del);
router.put('/Update-User/:id', userManager.Update);
router.get('/getAttendence/:id', userManager.getAttendence);
router.get('/getWorkInfo/:id', userManager.getCompletePandingWork);

// router.get('/getAll-User', userManager.getAll);
// router.get('/getAttendence/:id', userManager.getAttendence);





module.exports = router;