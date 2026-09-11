import { useState } from 'react';
import axios from 'axios';

function LoginPage({ onLogin, onRole }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);
      setMessage('logged in!');
      onLogin();
      if (onRole) onRole(res.data.role);
    } catch (err) {
      setMessage('wrong email or password');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input placeholder="email" onChange={e => setEmail(e.target.value)} /><br/>
      <input placeholder="password" type="password" onChange={e => setPassword(e.target.value)} /><br/>
      <button onClick={handleLogin}>Login</button>
      <p>{message}</p>
    </div>
  );
}

export default LoginPage;