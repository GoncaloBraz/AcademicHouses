const passport = require("passport");



exports.getLoginPage = (req, res, next) => {

    res.render('login');

}

//auth logout
exports.logout = (req, res, next) => {
    //handle with passport
    res.send("logging out");
}

// auth with Google
exports.authGoogle = (req, res, next) => {

};

exports.redirectGoogle = (err, req, res, next) => {

    if (err.name === 'TokenError') {
        res.redirect('/auth/google'); // redirect them back to the login page
    } else {
        // Handle other errors here
    }
},
    (req, res) => { // On success, redirect back to '/'
        res.redirect('/');
    };
