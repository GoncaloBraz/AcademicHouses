const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require("method-override")

const passport = require('passport'),
    LocalStrategy = require('passport-local'),
    passportLocalMongoose = require('passport-local-mongoose'),
    session = require('express-session');

mongoose.connect('mongodb+srv://gbraz:'+process.env.MONGO_ATLAS_PW+'@academichousescluster0-1cu9f.mongodb.net/test?retryWrites=true', {
    useNewUrlParser: true
});
mongoose.Promise = global.Promise;
// MODELS
const User = require('./api/components/user/models/user');
// COMPONENTS
const indexRoute = require('./api/routes/index');
const registerRoute = require('./api/components/user/routes/register');
const loginRoute = require('./api/components/user/routes/login');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(express.static('public'));
app.use(methodOverride("_method"));
app.set('view engine', 'ejs');

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize());

app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser()); // JSON --> String
passport.deserializeUser(User.deserializeUser()); // String --> JSON

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-Widht, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.use(indexRoute);
app.use('/register', registerRoute);
app.use('/login', loginRoute);


app.use((error, req, res, next) => {
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
})

module.exports = app;