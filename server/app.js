const express = require('express');
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')
const cors = require('cors')
const keys = require('./config/keys')
require('./models/OauthUser')
require('./services/passport');
const authRoutes = require('./routes/authRoutes');

const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors())
app.use(express.json());

app.use(
    cookieSession({
        maxAge: 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
)
app.use(passport.initialize())
app.use(passport.session())

authRoutes(app)

mongoose.connect(keys.mongoURI, {useUnifiedTopology: true, useNewUrlParser: true});

mongoose.connection.once("open", () =>
  console.log("MongoDB database connection established successfully")
)

console.log('Server started on:',PORT);
app.listen(PORT);
