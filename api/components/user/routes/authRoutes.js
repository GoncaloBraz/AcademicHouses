const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const passport = require('passport');

router.get('/login', authController.getLoginPage);

router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

// callback routes for google redirect


router.get('/google/redirect', passport.authenticate('google'), (req, res, next) => {
    res.redirect('/homepage/');
});

router.get('/facebook', passport.authenticate('facebook'));
router.get('/facebook/redirect', passport.authenticate('facebook'), (req, res, next) => {
    res.redirect('/homepage/');
});


router.get('/logout', authController.logout);

module.exports = router;