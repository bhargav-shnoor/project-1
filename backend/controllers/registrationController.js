const Registration = require('../models/Registration');
const Event = require('../models/Event');
const QRCode = require('qrcode');

const registerForEvent = async (req, res) => {
    const event = await Event.findById(req.params.eventId);
    if (!event) return res.status(404).json({ message: 'event not found' });

    const existing = await Registration.findOne({ event: req.params.eventId, user: req.user.id });
    if (existing) return res.status(400).json({ message: 'already registered' });

    if (event.registeredCount >= event.capacity) return res.status(400).json({ message: 'event is full' });

    const qrCode = await QRCode.toDataURL(`event:${req.params.eventId}-user:${req.user.id}`);
    const registration = await Registration.create({ event: req.params.eventId, user: req.user.id, qrCode });

    event.registeredCount += 1;
    await event.save();

    res.status(201).json({ message: 'registered!', qrCode, registration });
};

module.exports = { registerForEvent };