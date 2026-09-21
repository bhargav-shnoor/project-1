import { useEffect, useState } from 'react';
import axios from 'axios';

function EventsPage() {
    const [events, setEvents] = useState([]);
    const [search, setSearch] = useState('');
    const [qrCode, setQrCode] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        axios.get('https://project-1-1unj.onrender.com/api/events')
            .then(res => setEvents(res.data))
            .catch(err => console.log(err));
    }, []);

    const filtered = events.filter(event =>
        event.title.toLowerCase().includes(search.toLowerCase()) ||
        event.location.toLowerCase().includes(search.toLowerCase())
    );

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
            <input
                placeholder="Search by title or location..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ marginBottom: '20px' }}
            />
            {message && <p className={`message ${message.includes('success') ? 'message-success' : 'message-error'}`}>{message}</p>}
            {qrCode && (
                <div className="qr-container">
                    <p>Your QR Pass:</p>
                    <img src={qrCode} alt="QR pass" />
                </div>
            )}
            {filtered.length === 0 && <p>No events found.</p>}
            {filtered.map(event => (
                <div className="card" key={event._id}>
                    <h3>{event.title}</h3>
                    <div className="event-meta">
                        <p> {event.location}</p>
                        <p> {event.registeredCount}/{event.capacity}</p>
                        <p> {new Date(event.date).toLocaleDateString()}</p>
                    </div>
                    <button onClick={() => registerForEvent(event._id)}>Register →</button>
                </div>
            ))}
        </div>
    );
}

export default EventsPage;