const express = require('express');
const router = express.Router();
const { registerForEvent } = require('../controllers/registrationController');
const protect = require('../middleware/authMiddleware');

router.post('/:eventId', protect, registerForEvent);

module.exports = router;