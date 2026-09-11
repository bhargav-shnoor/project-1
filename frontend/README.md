## Event Pass Manager

A full stack web application for managing events, registrations, and digital QR passes.

## Features
- User registration and login with JWT authentication
- Organisers can create and manage events
- Users can register for events and receive a QR code pass
- Check-in system with duplicate prevention
- Attendance stats and participant list

## Tech Stack
- Frontend: React.js
- Backend: Node.js + Express.js
- Database: MongoDB Atlas
- Authentication: JWT + bcrypt

## Setup

### Backend
cd backend
npm install
node index.js

### Frontend
cd frontend
npm start

## API Endpoints
- GET /api/events - Get all events
- POST /api/events - Create event (organiser only)
- POST /api/auth/register - Register user
- POST /api/auth/login - Login user
- POST /api/register/:eventId - Register for event
- PUT /api/register/checkin/:id - Check in at event