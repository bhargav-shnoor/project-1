const mongoose = require('mongoose');
const eventSchema = new mongoose.Schema({
 title: { type: String, required: true },
 description: { type: String, required: true },
 date: { type: Date, required: true },
 location: { type: String, required: true },
 capacity: { type: Number, required: true },
 registeredCount: { type: Number, default: 0 },
 organiser: { type: String, required: true }
}, { timestamps: true });
module.exports = mongoose.model('Event', eventSchema);