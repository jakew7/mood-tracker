const mongoose = require('mongoose')
//passport-local-mongoose package auth
const plm = require('passport-local-mongoose')

let userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: 'Username is required',
        trim: true
    },
    password: {
        type: String,
        trim: true
    },
    oauthProvider: String,
    oauthId: String
})

// passport-local-mongoose handles auth
userSchema.plugin(plm)

// model public
module.exports = mongoose.model('User', userSchema)