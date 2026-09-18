import { useEffect, useState } from 'react';
import axios from 'axios';

function EventsPage() {
    const [events, setEvents] = useState([]);
    const [qrCode, setQrCode] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        axios.get('https://project-1-1unj.onrender.com/api/events')
            .then(res => setEvents(res.data))
            .catch(err => console.log(err));
    }, []);

    const registerForEvent = async (eventId) => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.post(
                `https://project-1-1unj.onrender.com/api/register/${eventId}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setQrCode(res.data.qrCode);
            setMessage('registered successfully!');
        } catch (err) {
            setMessage(err.response?.data?.message || 'registration failed');
        }
    };

    return (
        <div>
            <h2>Upcoming Events</h2>
            {message && <p className={`message ${message.includes('success') ? 'message-success' : 'message-error'}`}>{message}</p>}
            {qrCode && (
                <div className="qr-container">
                    <p>Your QR Pass:</p>
                    <img src={qrCode} alt="QR pass" />
                </div>
            )}
            {events.map(event => (
                <div className="event-card" key={event._id}>
                    <h3>{event.title}</h3>
                    
                    {/* Event Description */}
                    {event.description && (
                        <p className="event-description">{event.description}</p>
                    )}

                    {/* Clean SVG Meta Tags */}
                    <div className="event-meta">
                        {event.location && (
                            <p>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '6px' }}>
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                                    <circle cx="12" cy="10" r="3"/>
                                </svg>
                                {event.location}
                            </p>
                        )}
                        <p>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '6px' }}>
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                                <circle cx="9" cy="7" r="4"/>
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                            </svg>
                            {event.registeredCount}/{event.capacity}
                        </p>
                        {event.date && (
                            <p>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '6px' }}>
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                                    <line x1="16" y1="2" x2="16" y2="6"/>
                                    <line x1="8" y1="2" x2="8" y2="6"/>
                                    <line x1="3" y1="10" x2="21" y2="10"/>
                                </svg>
                                {new Date(event.date).toLocaleDateString()}
                            </p>
                        )}
                    </div>

                    <button onClick={() => registerForEvent(event._id)}>Register</button>
                </div>
            ))}
        </div>
    );
}

export default EventsPage;