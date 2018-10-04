const User = require('../models/userModel');


exports.requireAdmin = (req, res, next) => {

const password =  req.body.password;

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
        if(user.password == password){
            res.redirect('admin');
        }else{
            res.send("Password incorrecta");
        }

    })
}

