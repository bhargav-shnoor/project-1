import { useState } from 'react';
import axios from 'axios';

function RegisterPage({ onRegister, onRole, onBack }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const [message, setMessage] = useState('');

    const handleRegister = async () => {
        if (!name || !email || !password) {
            setMessage('Please fill in all fields');
            return;
        }
        if (!email.includes('@')) {
            setMessage('Please enter a valid email');
            return;
        }
        if (password.length < 6) {
            setMessage('Password must be at least 6 characters');
            return;
        }
        try {
            const res = await axios.post('https://project-1-1unj.onrender.com/api/auth/register', { name, email, password, role });
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('role', res.data.role);
            setMessage('registered successfully!');
            onRegister();
            if (onRole) onRole(res.data.role);
        } catch (err) {
            setMessage('registration failed');
        }
    };

    return (
        <div className="card">
            <h2>Register</h2>
            <input placeholder="Name" onChange={e => setName(e.target.value)} />
            <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
            <input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
            <select onChange={e => setRole(e.target.value)}>
                <option value="user">User</option>
                <option value="organiser">Organiser</option>
            </select>
            <button onClick={handleRegister}>Register</button>
            <button className="btn-secondary" onClick={onBack}>Back to Login</button>
            {message && <p>{message}</p>}
        </div>
    );
}

export default RegisterPage;