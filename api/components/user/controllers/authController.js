const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/userModel');

exports.getRegisterPage = (req, res, next) => {

    res.render('register', {
        user: req.user
    });
}

exports.postRegister = (req, res, next) => {

    const username = req.body.username;
    const password = req.body.password;

    User.findOne({
        username: username
    }
        , function (err, user) {
            if (user) {
                res.send("User exists")
            }
            else {
                const newUser = new User();

                newUser.username = username;
                newUser.password = newUser.hashPassword(password);
                newUser.platformId = 'Local';
                newUser.admin = false;

                newUser.save();
                res.redirect('/auth/login');
            }
        })

}


exports.postLogin = passport.authenticate('local', {
    successRedirect: '/homepage',
    failureRedirect: '/index',

}) , (req, res, next) => {

    console.log(req.user.username)
}

exports.getLoginPage = (req, res, next) => {

    res.render('login', {
        user: req.user
    });

}


//auth logout
exports.logout = (req, res, next) => {
    //handle with passport
    req.logout();
    res.redirect('/index');
}


exports.getAdminPage = (req, res, next) => {
    
    res.render('admin'), {
        user: req.user
    }
}

