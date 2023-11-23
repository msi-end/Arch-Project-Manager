const express = require('express');
const router = express.Router();
const EmpAuth = require('../../controllers/employee/auth.js')

router.get('/',EmpAuth.CheckLoginServer);
router.post('/auth-employee',EmpAuth.Auth);
router.get('/logout',EmpAuth.logout);






module.exports=router;