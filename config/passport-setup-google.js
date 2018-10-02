const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require("./keys");
const User = require('../api/components/user/models/userModel');

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser((id, done) => {

    User.findById(id, done)
        .then((user) => {
            done(null, user);
        })
})

passport.use(new GoogleStrategy({
    //options for strategy
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret,
    callbackURL: '/auth/google/redirect',

}, (accessToken, refreshToken, profile, done) => {

    // check if user already exists
    User.findOne({
        platformId: profile.id
    }).then((currentUser) => {
        if (currentUser) {

            //have user
            console.log('user is:' + currentUser);
            done(null, currentUser);
        } else {
            User.findOne({
                username: profile.displayName
            }).then((checkcurrentUser, res, req) => {
                if (checkcurrentUser) {
                    done(null);
                } else {
                    new User({
                        username: profile.displayName,
                        password: '',
                        platformId: profile.id
                    })
                        .save()
                        .then((newUser) => {
                            console.log('new user created' + newUser);
                            done(null, newUser);
                        })
                }
            })


        }
    })

})
)