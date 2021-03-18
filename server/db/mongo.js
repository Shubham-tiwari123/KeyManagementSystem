const mongoose = require('mongoose')
const User = mongoose.model('oauthUser')

/**
 * Save new user in database
 */
const saveUser = async (email, name, picture, email_verified) => {
    try {
        // check if user present or not
        const res = await User.findOne({email:email})

        // if not present register the user and return true
        if (res === null) {
            const res = await new User({email: email, name: name, picture: picture, emailVerified: email_verified}).save()
            console.log("res2:",res)
            return true
        }

        //return true if user already present
        return true
    } catch (e) {
        console.log("Error:",e)
        return false
    }
}

/**
 * Get new user from database
 */
const getUser = async (email) => {
    try {
        return await User.findOne({userEmail: email})
    } catch (e) {
        console.log("Error:",e)
        return false
    }
}

module.exports = {
    saveUser,
    getUser
}