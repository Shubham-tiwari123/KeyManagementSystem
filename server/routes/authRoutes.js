const passport = require('passport');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys')
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(keys.googleClientID)
const {getUser,saveUser} = require('../db/mongo')

module.exports = (app) =>{

    app.get('/api/success', (req,res)=>{
        res.send("Success")
    })

    app.get('/api/failure', (req,res)=>{
        res.send("failed!!!")
    })

    app.get(
        '/auth/google',
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    )

    app.get('/auth/google/callback', passport.authenticate('google',{
        successRedirect: '/api/success',
        failureRedirect: '/api/failure'
    }))

    app.get('/api/logout', function(req, res){
        req.logout();
        res.redirect('/auth/google');
    });

    app.post("/api/v1/auth/google", async (req, res) => {
        const { token }  = req.body
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: keys.googleClientID
        });

        const { name, email, picture, email_verified } = ticket.getPayload();
        console.log("Name:",name," Email:",email," Picture:",picture)

        await saveUser(email, name, picture, email_verified)
        const jwtToken = jwt.sign({ email: email }, keys.serverSecret, {
            expiresIn: 86400 // expires in 24 hours
        });
        res.status(201)
        res.json({
            email:email,
            name:name,
            picture:picture,
            jwtToken:jwtToken
        })
    })

}