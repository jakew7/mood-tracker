// import express
const express = require('express')
const router = express.Router()

// imports Moods model for CRUD
const Mood = require('../models/mood')

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
                moods: moods 
            })
            
        }
    })
})
    
// this gets create to load empty form
router.get('/create', (req, res) => {
    res.render('moods/create', {
        title: 'How are you feeling?'
    })

})


// export file
module.exports = router