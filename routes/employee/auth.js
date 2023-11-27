const express = require('express');
const router = express.Router();
const EmpAuth = require('../../controllers/employee/auth.js')

// for login and logout, auth 
router.get('/', EmpAuth.CheckLoginServe);
router.post('/auth-employee', EmpAuth.Auth);
router.get('/logout', EmpAuth.logout);


module.exports = router;