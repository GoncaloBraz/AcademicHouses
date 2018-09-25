const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const passport = require('passport');

router.get('/login', authController.getLoginPage);

router.get('/google', passport.authenticate('google', {scope: ['profile']})  ,authController.authGoogle);

// callback routes for google redirect

router.get('/google/redirect', passport.authenticate('google'), authController.redirectGoogle);

router.get('/logout', authController.logout);

module.exports = router;