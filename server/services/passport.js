const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose')
const keys = require('../config/keys')
const User = mongoose.model('oauthUser')

passport.serializeUser((user, done) =>{
    console.log("Called s")
    done(null, user.id)
})

passport.deserializeUser((id, done)=>{
    console.log("Called u!!")
    User.findById(id).then(user =>{
        done(null, user)
    })
})

passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true
    },  (accessToken, refreshToken, profile, done) => {
        User.findOne({googleId: profile.id}).then((user)=>{
            if (user){
                console.log("User:",user)
                done(null, user);
            }else{
                new User({
                    googleId: profile.id,
                    email: profile._json.email
                }).save()
                    .then((newUser) => {
                        done(null, newUser)
                    })
                    .catch((err) => {
                        console.log("err:",err)
                        done(err, user)
                    })
            }

        })
    })
);
