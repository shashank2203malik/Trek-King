const express = require('express');
const router = express.Router();
const passport = require('passport');
const auth = require('../controllers/auth.js');
const wrapAsync = require('../utilities/errorHandlers/wrapAsync.js');
const storeReturnTo = require('../utilities/middleware/storeReturnTo.js');
const User = require('../models/user');

router.get('/register', auth.registrationForm);


router.post('/register', wrapAsync(auth.register));

router.get('/login', auth.loginForm);

router.post('/login', storeReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), auth.login);

router.post('/logout', auth.logout);


module.exports = router;