import { useState } from 'react';
import axios from 'axios';

function RegisterPage({ onRegister }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleRegister = async () => {
        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', { name, email, password });
            localStorage.setItem('token', res.data.token);
            setMessage('registered successfully!');
            onRegister();
        } catch (err) {
            setMessage('registration failed');
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <input placeholder="name" onChange={e => setName(e.target.value)} /><br/>
            <input placeholder="email" onChange={e => setEmail(e.target.value)} /><br/>
            <input placeholder="password" type="password" onChange={e => setPassword(e.target.value)} /><br/>
            <button onClick={handleRegister}>Register</button>
            <p>{message}</p>
        </div>
    );
}

export default RegisterPage;