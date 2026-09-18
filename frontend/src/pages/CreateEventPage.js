import React, { useState } from 'react';
import axios from 'axios';

function CreateEventPage({ onBack }) {
    const [form, setForm] = useState({
        title: '', 
        description: '', 
        date: '',
        location: '', 
        capacity: ''
    });
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const token = localStorage.getItem('token');
            const res = await axios.post('/api/events', {
                title: form.title,
                description: form.description,
                date: form.date,
                location: form.location,
                capacity: Number(form.capacity)
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setMessage('Event created successfully!');
            setForm({ title: '', description: '', date: '', location: '', capacity: '' });
        } catch (err) {
            setMessage('Failed to create event: ' + (err.response?.data?.message || err.message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card">
            <h2>Create Event</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    name="title" 
                    placeholder="Event title" 
                    value={form.title} 
                    onChange={handleChange} 
                    required 
                />
                <input 
                    name="description" 
                    placeholder="Description" 
                    value={form.description} 
                    onChange={handleChange} 
                    required 
                />
                <input 
                    name="date" 
                    type="date" 
                    value={form.date} 
                    onChange={handleChange} 
                    required 
                />
                <input 
                    name="location" 
                    placeholder="Location" 
                    value={form.location} 
                    onChange={handleChange} 
                    required 
                />
                <input 
                    name="capacity" 
                    placeholder="Capacity" 
                    type="number" 
                    value={form.capacity} 
                    onChange={handleChange} 
                    required 
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Creating...' : 'Create Event'}
                </button>
            </form>
            <button onClick={onBack} style={{ marginTop: '10px' }}>Back</button>
            {message && <p style={{ marginTop: '10px', fontWeight: 'bold' }}>{message}</p>}
        </div>
    );
}

export default CreateEventPage;