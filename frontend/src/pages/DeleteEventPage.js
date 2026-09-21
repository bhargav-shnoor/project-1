import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'https://project-1-1unj.onrender.com';

const DeleteEventPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyEvents();
  }, []);

  const fetchMyEvents = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_BASE_URL}/api/events/my-events`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEvents(res.data);
    } catch (err) {
      console.error('Error fetching events:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (eventId, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"? This cannot be undone.`)) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_BASE_URL}/api/events/${eventId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setEvents(events.filter(event => event._id !== eventId));
      alert('Event deleted successfully.');
    } catch (err) {
      alert('Failed to delete event: ' + (err.response?.data?.message || err.message));
    }
  };

  if (loading) return <div className="full-panel"><p>Loading events...</p></div>;

  return (
    <div className="full-panel">
      <h1>Delete Events</h1>
      <p style={{ marginBottom: '24px' }}>
        Select an event created under your organiser account to permanently remove it.
      </p>

      {events.length === 0 ? (
        <p>No active events found to delete.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {events.map((event) => (
            <div key={event._id} className="event-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', border: '1px solid #ccc', borderRadius: '8px' }}>
              <div>
                <h3>{event.title}</h3>
                <p><strong>Attendees:</strong> {event.attendees ? event.attendees.length : (event.registeredCount || 0)}</p>
              </div>
              <button 
                onClick={() => handleDelete(event._id, event.title)}
                style={{ 
                  backgroundColor: '#fee2e2', 
                  color: '#991b1b', 
                  borderColor: '#fca5a5',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 16px',
                  cursor: 'pointer'
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DeleteEventPage;