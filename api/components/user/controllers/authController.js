const passport = require("passport");



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


