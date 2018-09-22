const passport = require("passport");
const User = require('../models/user');

exports.getRegisterPage = (req, res, next) => {
    res.render('register');
}

exports.postRegisterData = (req, res, next) => {

    const email = req.body.username;
    const password = req.body.password;

    User.register(new User({
        username: email
    }), password, (err, user) => {

        if (err) {
            res.send(err.message);
            return res.status(500).json({
                error: err
            })

        } else {
            res.redirect('/login');
        }
    })



}