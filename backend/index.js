const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const eventRoutes = require('./routes/eventRoutes');
const authRoutes = require('./routes/authRoutes');
const registrationRoutes = require('./routes/registrationRoutes'); // add this

require('dotenv').config();
const app = express();
connectDB();
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
    res.json({ message: 'Event Pass Manager API running!' });
});
app.use('/api/events', eventRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/register', registrationRoutes); // add this
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`server on port ${PORT}`);
});