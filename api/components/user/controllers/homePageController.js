


exports.getHomePage = (req, res, next) => {
    console.log(req.user);
    res.render('homePage', {
        user: req.user
    });
}