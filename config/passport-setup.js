const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require("./keys");
const User = require('../api/components/user/models/userModel');

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser((id, done) => {

    User.findById(id)
        .then((user) => {
            done(null, user.id);
        })
        .catch((err) => {
            res.send(500).json({
                error: err
            })
        });
})

passport.use(new GoogleStrategy({
    //options for strategy
    callbackURL: '/auth/google/redirect',
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret

}, (accessToken, refreshToken, profile, done) => {

    // check if user already exists
    User.findOne({
        googleId: profile.id
    }).then((currentUser) => {
        if (currentUser) {
            //have user
            console.log('user is:' + currentUser);
            done(null, currentUser);
        } else {
            new User({
                username: profile.displayName,
                googleId: profile.id
            })
                .save()
                .then((newUser) => {
                    console.log('new user created' + newUser);
                    done(null, newUser);
                })
                .catch((err) => {
                    res.send(500).json({
                        error: err
                    })
                });
        }
    }).catch((err) => {
        res.send(500).json({
            error: err
        })
    });


})
)