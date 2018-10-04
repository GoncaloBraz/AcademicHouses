const passport = require('passport');
const FacebookStrategy = require("passport-facebook").Strategy;
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

passport.use(new FacebookStrategy({
    //options for strategy
    clientID: keys.facebook.clientID,
    clientSecret: keys.facebook.clientSecret,
    callbackURL: '/auth/facebook/redirect',
    profileFields: ['id', 'displayName', 'photos', 'email']
}, (accessToken, refreshToken, profile, done) => {

    console.log(profile);

    // check if user already exists
    User.findOne({
        platformId: profile.id,
        username: profile.displayName
    }).then((currentUser) => {
        if (currentUser) {

            //have user
            console.log('user is:' + currentUser);
            done(null, currentUser);
        } else {

            new User({
                username: profile.displayName,
                password: '',
                platformId: profile.id,
                admin: false,
                orders: []
            })
                .save()
                .then((newUser) => {
                    console.log('new user created' + newUser);
                    done(null, newUser);
                })
        }
    })

})
)