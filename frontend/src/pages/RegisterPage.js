import { useState } from 'react';
import axios from 'axios';

function RegisterPage({ onRegister, onRole }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const [message, setMessage] = useState('');

    const handleRegister = async () => {
        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', { name, email, password, role });
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
            <input placeholder="name" onChange={e => setName(e.target.value)} />
            <input placeholder="email" onChange={e => setEmail(e.target.value)} />
            <input placeholder="password" type="password" onChange={e => setPassword(e.target.value)} />
            <select onChange={e => setRole(e.target.value)}>
                <option value="user">User</option>
                <option value="organiser">Organiser</option>
            </select>
            <button onClick={handleRegister}>Register</button>
            <p>{message}</p>
        </div>
    );
}

export default RegisterPage;