const Event = require('../models/Event');

// Get all events
const getEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get organiser's created events
const getMyEvents = async (req, res) => {
    try {
        const userId = req.user?._id ? req.user._id.toString() : (req.user?.id ? req.user.id.toString() : null);
        const username = req.user?.username || req.user?.name;
        const email = req.user?.email;

        // Query by User ID, Username, or Email so legacy database records match
        const queryConditions = [];
        if (userId) queryConditions.push({ organiser: userId });
        if (username) queryConditions.push({ organiser: username });
        if (email) queryConditions.push({ organiserEmail: email });

        const events = await Event.find(queryConditions.length > 0 ? { $or: queryConditions } : {});
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create Event
const createEvent = async (req, res) => {
    console.log('req.user:', req.user);
    console.log('req.body:', req.body);
    try {
        if (req.user.role !== 'organiser') {
            return res.status(403).json({ message: 'only organisers can create events' });
        }
        const organiserId = req.user._id.toString();
        console.log('organiserId:', organiserId);
        
        const event = new Event({
            title: req.body.title,
            description: req.body.description,
            date: req.body.date,
            location: req.body.location,
            capacity: Number(req.body.capacity),
            organiser: organiserId,
            organiserEmail: req.user.email || ''
        });
        
        const savedEvent = await event.save();
        return res.status(201).json(savedEvent);
    } catch (error) {
        console.error('Create Event Error:', error);
        return res.status(400).json({ message: error.message });
    }
};
// Update Event
const updateEvent = async (req, res) => {
    try {
        const updated = await Event.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updated);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete Event
const deleteEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        const userId = req.user?._id ? req.user._id.toString() : (req.user?.id ? req.user.id.toString() : null);
        const username = req.user?.username || req.user?.name;

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        const isOwner = event.organiser === userId || 
                        event.organiser === username || 
                        (event.organiserEmail && event.organiserEmail === req.user?.email);

        if (!isOwner) {
            return res.status(403).json({ message: 'Unauthorized action' });
        }

        await event.deleteOne();
        res.json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting event', error: error.message });
    }
};

module.exports = { 
    getEvents, 
    createEvent, 
    updateEvent, 
    deleteEvent, 
    getMyEvents 
};