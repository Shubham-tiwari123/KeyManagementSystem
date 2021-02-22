const passport = require('passport');

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

}