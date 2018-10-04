const express = require('express');
const cookieSession = require('cookie-session');

const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require("method-override")

const passport = require('passport'),
    LocalStrategy = require('passport-local'),
    passportLocalMongoose = require('passport-local-mongoose'),
    session = require('express-session');

const passportSetup = require('./config/passport-setup-google');
const passportfacebook = require('./config/passport-setup-facebook');
const passportLocal = require('./config/passport-setup-local');

const app = express();
const keys = require('./config/keys');

// set up session cookies
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
})); 

app.use(passport.initialize());
app.use(passport.session());  

mongoose.connect('mongodb+srv://gbraz:'+process.env.MONGO_ATLAS_PW+'@academichousescluster0-1cu9f.mongodb.net/test?retryWrites=true', {
    useNewUrlParser: true
});
mongoose.Promise = global.Promise;
// MODELS
const User = require('./api/components/user/models/userModel');
const Location = require('./api/components/location/models/locationModel');
// COMPONENTS
const indexRoute = require('./api/routes/index');
const authRoute = require('./api/components/user/routes/authRoutes');
const homePageRoute = require('./api/components/user/routes/homepageRoutes');
const locationRoute = require('./api/components/location/routes/addLocationRoutes');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.set('trust proxy', 1) // trust first proxy
app.use(express.static('public'));
app.use(methodOverride("_method"));
app.set('view engine', 'ejs');

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false
}))

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-Widht, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});



app.use('/index', indexRoute);
app.use('/auth', authRoute);
app.use('/homepage', homePageRoute);
app.use('/location', locationRoute);


/* app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })

})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
}) */

module.exports = app;