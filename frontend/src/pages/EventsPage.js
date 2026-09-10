import { useEffect, useState } from 'react';
import axios from 'axios';

function EventsPage({ onLogout }) {
    const [events, setEvents] = useState([]);
    const [qrCode, setQrCode] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/api/events')
            .then(res => setEvents(res.data))
            .catch(err => console.log(err));
    }, []);

    const registerForEvent = async (eventId) => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.post(
                `http://localhost:5000/api/register/${eventId}`,
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
            <h2>All Events</h2>
            <button onClick={onLogout}>Logout</button>
            {message && <p>{message}</p>}
            {qrCode && <img src={qrCode} alt="your QR pass" />}
            {events.map(event => (
                <div key={event._id}>
                    <h3>{event.title}</h3>
                    <p>{event.location}</p>
                    <p>Capacity: {event.capacity}</p>
                    <button onClick={() => registerForEvent(event._id)}>Register</button>
                </div>
            ))}
        </div>
    );
}

export default EventsPage;