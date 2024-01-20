const express = require('express');
const router = express.Router();
const caAuth = require('../../controllers/CA/auth')

// for login and logout, auth 
router.get('/', caAuth.CheckLoginServe);
router.post('/auth', caAuth.Auth);
router.get('/logout', caAuth.logout);


module.exports = router;