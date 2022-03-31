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
    
// export file
module.exports = router