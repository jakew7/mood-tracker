// mongoose with mongodb
const mongoose = require('mongoose')

//create schema
let moodSchema = new mongoose.Schema({
    name: {
        type: String,
        requires:'Name is required',
        trim: true
    },
    emotion: {
        type: String,
        requires:'Emotion is required',
        trim: true
    },
    notable: {
        type: String,
        trim: true
    },
    date: {
        type: String,
        requires:'Date is required',
        default: Date.now,
        
    }
})



// make public
module.exports = mongoose.model('Mood', moodSchema)