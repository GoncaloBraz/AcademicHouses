const passport = require("passport");

exports.getLoginPage = (req, res, next) => {
    res.render('login');
}


exports.SubmitLogin = passport.authenticate("local", {

    successRedirect: "/homepage",
    failureRedirect: "/"

}), (req, res) => {

    console.log("is not reached...");   
}