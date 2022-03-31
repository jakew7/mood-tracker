const express = require('express')
const router = express.Router()

// refs for auth needed
const passport = require('passport')
const User = require('../models/user')

// GET auth register
router.get('/register', (req, res) => {
    res.render('auth/register', {
        title: 'Register'
    })
})

//  POST for auth/register
router.post('/register', (req, res) => {
    User.register(new User({ username: req.body.username }), req.body.password, (err, user) => {
        if (err) {
            return res.render('auth/register')
        }
        else{
            // if register is good send to moods
            req.login(user, (err) => {
                res.redirect('/moods')
            })
        }
    })
})

// GET auth login
router.get('/login', (req, res) => {
    //check for errors
    let messages = req.session.messages || []

    //clear out messages
    req.session.messages = []

    res.render('auth/login', {
        title: 'Login',
        messages: messages
    })
})

// POST handler for login
router.post('/login', passport.authenticate('local', {
    successRedirect: '/moods',
    failureRedirect: '/auth/login',
    // adds message to req.session.messages array
    failureMessage: 'Invalid Login'
}))

// get logout
router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/auth/login')
})

// GET github login attempt
router.get('/github', passport.authenticate('github', { scope: ['user.email']}))

// GET github strategy
router.get('/github/callback', passport.authenticate('github', {
    failureRedirect: '/auth/login' }), (req, res) => {
        res.redirect('/moods')
    }
)

// makes routes public
module.exports = router