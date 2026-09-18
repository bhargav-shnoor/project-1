import { useEffect, useState } from 'react';
import axios from 'axios';

function UserDashboard({ onBack }) {
    const [myRegistrations, setMyRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get('https://project-1-1unj.onrender.com/api/events/my-registrations', {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => {
            setMyRegistrations(res.data);
            setLoading(false);
        })
        .catch(err => {
            console.error(err);
            setLoading(false);
        });
    }, []);

    const cancelRegistration = async (eventId) => {
        if (!window.confirm('Cancel your registration for this event?')) return;
        try {
            const token = localStorage.getItem('token');
            await axios.post(`https://project-1-1unj.onrender.com/api/events/${eventId}/cancel`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMyRegistrations(prev => prev.filter(item => item._id !== eventId));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h2>My Dashboard</h2>
            <button className="btn-secondary" onClick={onBack}>← Back to Events</button>

            <div className="card">
                <h3>My Upcoming Events</h3>
                <p>{myRegistrations.length}</p>
            </div>

            <h2>Your Saved Passes</h2>
            {loading ? (
                <p>Loading your passes...</p>
            ) : myRegistrations.length === 0 ? (
                <p>You haven't registered for any events yet.</p>
            ) : (
                myRegistrations.map(event => (
                    <div className="event-card" key={event._id}>
                        <h3>{event.title}</h3>
                        <div className="event-meta">
                            {event.location && <p>{event.location}</p>}
                            {event.date && <p>{new Date(event.date).toLocaleDateString()}</p>}
                        </div>

                        {/* Pass QR Code Placeholder */}
                        <div className="qr-container">
                            <p>Your Entry Pass</p>
                            <img 
                                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${event._id}`} 
                                alt="Event QR Pass" 
                            />
                        </div>

                        <button 
                            className="btn-secondary"
                            style={{ marginTop: '12px' }}
                            onClick={() => cancelRegistration(event._id)}
                        >
                            Cancel Registration
                        </button>
                    </div>
                ))
            )}
        </div>
    );
}

export default UserDashboard;