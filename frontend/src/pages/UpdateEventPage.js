import React, { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'https://project-1-1unj.onrender.com';

function UpdateEventPage({ event, onBack, onUpdated }) {
    const [form, setForm] = useState({
        title: event.title || '',
        description: event.description || '',
        date: event.date ? event.date.split('T')[0] : '',
        location: event.location || '',
        capacity: event.capacity || ''
    });
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        setLoading(true);
        setMessage('');
        try {
            const token = localStorage.getItem('token');
            await axios.put(`${API_BASE_URL}/api/events/${event._id}`, form, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMessage('Event updated successfully!');
            if (onUpdated) onUpdated();
        } catch (err) {
            setMessage('Failed to update: ' + (err.response?.data?.message || err.message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card">
            <h2>Update Event</h2>
            <input name="title" placeholder="Event title" value={form.title} onChange={handleChange} />
            <input name="description" placeholder="Description" value={form.description} onChange={handleChange} />
            <input name="date" type="date" value={form.date} onChange={handleChange} />
            <input name="location" placeholder="Location" value={form.location} onChange={handleChange} />
            <input name="capacity" placeholder="Capacity" type="number" value={form.capacity} onChange={handleChange} />
            <button onClick={handleSubmit} disabled={loading}>
                {loading ? 'Updating...' : 'Update Event'}
            </button>
            <button className="btn-secondary" onClick={onBack} style={{ marginTop: '10px' }}>Back</button>
            {message && <p>{message}</p>}
        </div>
    );
}

export default UpdateEventPage;