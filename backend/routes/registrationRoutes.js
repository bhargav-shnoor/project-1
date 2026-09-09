const express = require('express');
const router = express.Router();
const { registerForEvent, checkIn } = require('../controllers/registrationController');
const protect = require('../middleware/authMiddleware');

router.put('/checkin/:registrationId', protect, checkIn);
router.post('/:eventId', protect, registerForEvent);

module.exports = router;