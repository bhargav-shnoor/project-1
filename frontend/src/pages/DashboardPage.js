import { useEffect, useState } from 'react';
import axios from 'axios';

function DashboardPage({ onBack }) {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get('https://project-1-1unj.onrender.com/api/events', {
            headers: { Authorization: `Bearer ${token}` }
        }).then(res => setEvents(res.data));
    }, []);

    return (
        <div>
            <h2>Dashboard</h2>
            <button className="btn-secondary" onClick={onBack}>← Back to Events</button>
            <div className="card">
                <h3>Total Events</h3>
                <p>{events.length}</p>
            </div>
            <div className="card">
                <h3>Total Registrations</h3>
                <p>{events.reduce((sum, e) => sum + e.registeredCount, 0)}</p>
            </div>
            <h2>Your Events</h2>
            {events.map(event => (
                <div className="card" key={event._id}>
                    <h3>{event.title}</h3>
                    <p>📍 {event.location}</p>
                    <p>👥 {event.registeredCount}/{event.capacity} registered</p>
                    <p>📅 {new Date(event.date).toLocaleDateString()}</p>
                </div>
            ))}
        </div>
    );
}

export default DashboardPage;