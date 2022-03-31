// import express
const express = require('express')
const router = express.Router()

// imports Moods model for CRUD
const Mood = require('../models/employer')

//get root of mood
router.get('/', (req, res) => {
    res.render('moods/index', { title: 'Moods' })
});

// export file
module.exports = router