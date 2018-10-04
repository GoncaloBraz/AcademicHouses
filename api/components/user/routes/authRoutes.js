const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const passport = require('passport');
const adminMiddleware = require('../middlewares/adminMiddleware');


router.get('/admin', authController.getAdminPage);

// Local Login
router.get('/login', authController.getLoginPage);

router.post('/login', adminMiddleware.requireAdmin , authController.postLogin);

// Local Register

router.get('/register', authController.getRegisterPage);

router.post('/register', authController.postRegister);

// Google Register/Login
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

// callback routes for google redirect
router.get('/google/redirect', passport.authenticate('google'), (req, res, next) => {
    res.redirect('/homepage/');
});
// Facebook Register/Login
router.get('/facebook', passport.authenticate('facebook'));
// callback routes for facebook redirect
router.get('/facebook/redirect', passport.authenticate('facebook'), (req, res, next) => {
    res.redirect('/homepage/');
});

// Logout
router.get('/logout', authController.logout);

module.exports = router;