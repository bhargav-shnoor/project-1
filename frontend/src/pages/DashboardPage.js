import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'https://project-1-1unj.onrender.com';

const DashboardPage = () => {
  const [myEvents, setMyEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrganiserDashboard();
  }, []);

  const fetchOrganiserDashboard = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_BASE_URL}/api/events/my-events`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMyEvents(res.data);
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (eventId) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_BASE_URL}/api/events/${eventId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMyEvents(myEvents.filter(event => event._id !== eventId));
    } catch (err) {
      alert('Failed to delete event: ' + (err.response?.data?.message || err.message));
    }
  };

  const totalRegistrations = myEvents.reduce(
    (acc, event) => acc + (event.registeredCount || 0),
    0
);

  if (loading) return <p>Loading dashboard...</p>;

  return (
    <div className="full-panel">
      <h1>Organiser Dashboard</h1>

      <div className="form-grid" style={{ marginBottom: '32px' }}>
        <div className="card">
          <p className="form-group label">Events Created</p>
          <h2>{myEvents.length}</h2>
        </div>
        <div className="card">
          <p className="form-group label">Total Registrations</p>
          <h2>{totalRegistrations}</h2>
        </div>
      </div>

      <h2>Your Created Events</h2>

      {myEvents.length === 0 ? (
        <p>You haven't created any events yet.</p>
      ) : (
        myEvents.map(event => (
          <div key={event._id} className="event-card" style={{ marginBottom: '16px', padding: '16px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <p><strong>Registrations:</strong> {event.registeredCount || 0}</p>
              </div>
              <button 
                onClick={() => handleDelete(event._id)} 
                className="btn-secondary"
                style={{ backgroundColor: '#fee2e2', color: '#991b1b', borderColor: '#fca5a5', padding: '8px 16px', cursor: 'pointer' }}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default DashboardPage;