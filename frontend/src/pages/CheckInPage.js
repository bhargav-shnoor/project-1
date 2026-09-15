import { useState } from 'react';
import axios from 'axios';

function CheckInPage({ onBack }) {
    const [registrationId, setRegistrationId] = useState('');
    const [message, setMessage] = useState('');

    const handleCheckIn = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.put(
                `https://project-1-1unj.onrender.com/api/register/checkin/${registrationId}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setMessage(res.data.message);
        } catch (err) {
            setMessage(err.response?.data?.message || 'check in failed');
        }
    };

    return (
        <div className="card">
            <h2>Check In</h2>
            <input
                placeholder="Enter registration ID"
                onChange={e => setRegistrationId(e.target.value)}
            />
            <button onClick={handleCheckIn}>Check In</button>
            <button onClick={onBack}>Back</button>
            {message && <p>{message}</p>}
        </div>
    );
}

export default CheckInPage;