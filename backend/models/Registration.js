const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
    event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    qrCode: { type: String },
    checkedIn: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Registration', registrationSchema);