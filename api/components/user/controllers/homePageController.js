
exports.authCheck = (req, res, next) =>{
    if(!req.user){
        res.redirect('/auth/login');
    }else{
        next();
    }
}


exports.getHomePage = (req, res, next) => {
    console.log(req.user);
    res.render('homePage', {
        user: req.user
    });
}