const User = require('../models/userModel');

exports.requireAdmin = (req, res, next) => {
    User.findOne({
        username: req.body.username
    }, (err, user) => {
        if (err) {
            return next(err)
        }
        if (!user) {
            return next();
        }
        if (!user.admin) {
            return next();
        }
        res.redirect('admin');
    })
}

