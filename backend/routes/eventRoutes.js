const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const { 
    getEvents, 
    createEvent, 
    updateEvent, 
    deleteEvent, 
    getMyEvents 
} = require('../controllers/eventController');

router.get('/', getEvents);
router.get('/my-events', protect, getMyEvents);
router.post('/', protect, createEvent);
router.put('/:id', protect, updateEvent);
router.delete('/:id', protect, deleteEvent);

module.exports = router;