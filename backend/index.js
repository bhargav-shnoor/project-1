const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const eventRoutes = require('./routes/eventRoutes');
const authRoutes = require('./routes/authRoutes');
const registrationRoutes = require('./routes/registrationRoutes');

require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

// Configure CORS for local development and production
app.use(cors({
    origin: ['http://localhost:3000', 'https://project-1-1unj.onrender.com'],
    credentials: true
}));

// Body parser middleware
app.use(express.json());

// Base test endpoint
app.get('/', (req, res) => {
    res.json({ message: 'Event Pass Manager API running!' });
});

// API Routes
app.use('/api/events', eventRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/register', registrationRoutes);

// Global 404 handler for unknown routes
app.use((req, res) => {
    res.status(404).json({ message: `Cannot ${req.method} ${req.originalUrl}` });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});