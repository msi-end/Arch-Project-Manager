const express = require('express');
const router = express.Router();
const userManager = require('../../controllers/userManager.crud')


router.post('/add-User', userManager.add);
router.get('/getOne-User/:id', userManager.getOne);
router.put('/Update-User/:id', userManager.Update);
router.put('/upd-password/:id', userManager.ChangePwd);
router.get('/getAttendence/:id', userManager.getAttendence);
router.get('/getAttenMonth/:id', userManager.getAttendenceByMonth);
router.get('/getWorkInfo/:id', userManager.getCompletePandingWork);

// router.get('/getAtten-byMonth/:id', userManager.getAttendence);
// router.delete('/del-User/:id', userManager.Del);
// router.get('/getAll-User', userManager.getAll);





module.exports = router;