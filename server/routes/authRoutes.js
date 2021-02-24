const passport = require('passport');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys')
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(keys.googleClientID)

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
        console.log("Token:",token)
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: keys.googleClientID
        });
        const { name, email, picture } = ticket.getPayload();
        /*const user = await db.user.upsert({
            where: { email: email },
            update: { name, picture },
            create: { name, email, picture }
        })  */
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