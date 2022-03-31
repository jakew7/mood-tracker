// import express
const express = require('express')
const req = require('express/lib/request')
const router = express.Router()

// imports Moods model for CRUD
const Mood = require('../models/mood')

//auth
const passport = require('passport')
function isAuthenticated(req, res, next) {
    // authenticate with passport
    if (req.isAuthenticated()) {
        return next()
    }
    // login page
    res.redirect('/auth/login')
}

//get root of mood
router.get('/', (req, res) => {
// mongoose model to query
    Mood.find((err, moods) => {
        if (err) {
            console.log(err)
        }
        else{
            res.render('moods/index', { 
                title: 'Moods',
                moods: moods,
                user: req.user
            })
            
        }
    })
})
    
// this gets create to load empty form and check auth
router.get('/create', isAuthenticated, (req, res) => {
    res.render('moods/create', {
        title: 'How are you feeling?',
        user: req.user
    })
})

// Post moods/create
router.post('/create',  isAuthenticated, (req, res) => {
    //  mongoose model create new mood from form
    Mood.create(req.body, (err, mood) => {
        if (err) {
            console.log(err)
        }
        else {
            res.redirect('/moods')
        }
    })
})

// GET delete mood  /moods/delete/randomgen
router.get('/delete/:_id', isAuthenticated, (req, res) =>{
    Mood.remove({_id: req.params._id }, (err) => {
    if (err) {
        console.log(err)
    }
    else {
        res.redirect('/moods')
        }
    })
})

// GET /moods/edit/randomgen chosen edit url
router.get('/edit/:_id',  isAuthenticated, (req, res) => {
    Mood.findById(req.params._id, (err, mood) => {
        if(err) {
            console.log(err)
        }
        else {
            res.render('moods/edit', {
                title: 'How are you feeling?',
                mood: mood,
                user: req.user
            })
        }
    })
})

// POST /moods/edit/randomgen redirects to updated doc
router.post('/edit/:_id', isAuthenticated, (req, res) => {
    Mood.findByIdAndUpdate({_id: req.params._id }, req.body, null, (err, mood) => {
    if (err) {
        console.log(err)
    }
    else {
        res.redirect('/moods')
    }
    })
})


// export file
module.exports = router
