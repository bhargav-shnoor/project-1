import { useState } from 'react';
import axios from 'axios';

function CreateEventPage({ onBack }) {
    const [form, setForm] = useState({
        title: '', description: '', date: '',
        location: '', capacity: '', organiser: ''
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.post('https://project-1-1unj.onrender.com/api/events', form, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMessage('event created successfully!');
        } catch (err) {
            setMessage('failed to create event');
        }
    };

    return (
        <div className="card">
            <h2>Create Event</h2>
            <input name="title" placeholder="Event title" onChange={handleChange} />
            <input name="description" placeholder="Description" onChange={handleChange} />
            <input name="date" type="date" onChange={handleChange} />
            <input name="location" placeholder="Location" onChange={handleChange} />
            <input name="capacity" placeholder="Capacity" type="number" onChange={handleChange} />
            <input name="organiser" placeholder="Organiser name" onChange={handleChange} />
            <button onClick={handleSubmit}>Create Event</button>
            <button onClick={onBack}>Back</button>
            {message && <p>{message}</p>}
        </div>
    );
}

export default CreateEventPage;