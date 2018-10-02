const express = require('express');
const router = express.Router();
const HomePageController = require('../controllers/homePageController');

const loggedin = function(req, res, next){
    if(req.isAuthenticated()){
        next()
    }else{
        res.redirect('/index');
    }
}

router.get('/', loggedin, HomePageController.getHomePage);

module.exports = router;