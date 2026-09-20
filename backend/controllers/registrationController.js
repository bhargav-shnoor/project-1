const Registration = require('../models/Registration');
const Event = require('../models/Event');
const QRCode = require('qrcode');

const registerForEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.eventId);
        if (!event) return res.status(404).json({ message: 'event not found' });

        const existing = await Registration.findOne({ event: req.params.eventId, user: req.user.id });
        if (existing) return res.status(400).json({ message: 'already registered' });

        if (event.registeredCount >= event.capacity) return res.status(400).json({ message: 'event is full' });

        const qrCode = await QRCode.toDataURL(`event:${req.params.eventId}-user:${req.user.id}`);
        const registration = await Registration.create({ event: req.params.eventId, user: req.user.id, qrCode });

        // Update count and push user ID to event's attendees list
        event.registeredCount += 1;
        if (!event.attendees) event.attendees = [];
        event.attendees.push(req.user.id);
        await event.save();

        res.status(201).json({ message: 'registered!', qrCode, registration });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const checkIn = async (req, res) => {
    try {
        const registration = await Registration.findById(req.params.registrationId);
        if (!registration) return res.status(404).json({ message: 'registration not found' });
        if (registration.checkedIn) return res.status(400).json({ message: 'already checked in' });
        registration.checkedIn = true;
        await registration.save();
        res.json({ message: 'checked in successfully!', registration });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getParticipants = async (req, res) => {
    try {
        const participants = await Registration.find({ event: req.params.eventId })
            .populate('user', 'name email');
        res.json(participants);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getStats = async (req, res) => {
    try {
        const total = await Registration.countDocuments({ event: req.params.eventId });
        const checkedIn = await Registration.countDocuments({ event: req.params.eventId, checkedIn: true });
        res.json({ total, checkedIn, remaining: total - checkedIn });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getMyRegistrations = async (req, res) => {
    try {
        const registrations = await Registration.find({ user: req.user.id })
            .populate('event');
        
        // Filter out any registrations where the event might have been deleted
        const validRegistrations = registrations.filter(r => r.event !== null);

        const events = validRegistrations.map(r => ({
            ...r.event._doc,
            registrationId: r._id,
            checkedIn: r.checkedIn,
            qrCode: r.qrCode
        }));
        res.json(events);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { registerForEvent, checkIn, getParticipants, getStats, getMyRegistrations };