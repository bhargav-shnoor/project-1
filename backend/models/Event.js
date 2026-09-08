const mongoose = require('mongoose');

// defining what an event looks like in the db
const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    // tracks how many people registered
    registeredCount: {
        type: Number,
        default: 0
    },
    organiser: {
        type: String,
        required: true
    }
}, { timestamps: true }); // auto adds createdAt and updatedAt

module.exports = mongoose.model('Event', eventSchema);