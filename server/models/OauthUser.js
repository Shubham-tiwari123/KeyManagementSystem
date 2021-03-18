const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    email: String,
    name: String,
    picture: String,
    emailVerified: Boolean
});

mongoose.model('oauthUser', userSchema);

