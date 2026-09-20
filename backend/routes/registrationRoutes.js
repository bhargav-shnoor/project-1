const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const Registration = require('../models/Registration');
const Event = require('../models/Event');
const { registerForEvent, checkIn, getParticipants, getStats } = require('../controllers/registrationController');

const getMyRegistrations = async (req, res) => {
    try {
        const userId = req.user._id || req.user.id;
        const registrations = await Registration.find({ user: userId }).populate('event');
        const events = registrations
            .filter(r => r.event)
            .map(r => ({
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

router.get('/my-registrations', protect, getMyRegistrations);
router.get('/:eventId/participants', protect, getParticipants);
router.get('/:eventId/stats', protect, getStats);
router.put('/checkin/:registrationId', protect, checkIn);
router.post('/:eventId', protect, registerForEvent);
router.post('/:eventId/cancel', protect, async (req, res) => {
    try {
        const userId = req.user._id || req.user.id;
        await Registration.findOneAndDelete({ event: req.params.eventId, user: userId });
        const event = await Event.findById(req.params.eventId);
        if (event && event.registeredCount > 0) { 
            event.registeredCount -= 1; 
            await event.save(); 
        }
        res.json({ message: 'Registration cancelled successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;