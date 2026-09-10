import { useState } from 'react';
import EventsPage from './pages/EventsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setLoggedIn(false);
    };

    return (
        <div>
            <h1>Event Pass Manager</h1>
            {loggedIn ? (
                <EventsPage onLogout={handleLogout} />
            ) : showRegister ? (
                <RegisterPage onRegister={() => setLoggedIn(true)} />
            ) : (
                <div>
                    <LoginPage onLogin={() => setLoggedIn(true)} />
                    <button onClick={() => setShowRegister(true)}>Don't have an account? Register</button>
                </div>
            )}
        </div>
    );
}

export default App;