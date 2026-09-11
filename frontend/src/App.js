import { useState } from 'react';
import './App.css';
import EventsPage from './pages/EventsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CreateEventPage from './pages/CreateEventPage';
import CheckInPage from './pages/CheckInPage';

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [showCreate, setShowCreate] = useState(false);
    const [showCheckIn, setShowCheckIn] = useState(false);
    const [role, setRole] = useState(localStorage.getItem('role'));

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        setLoggedIn(false);
        setRole(null);
    };

    return (
        <div className="container">
            <h1>Event Pass Manager</h1>
            {loggedIn ? (
                showCreate ? (
                    <CreateEventPage onBack={() => setShowCreate(false)} />
                ) : showCheckIn ? (
                    <CheckInPage onBack={() => setShowCheckIn(false)} />
                ) : (
                    <div>
                        {role === 'organiser' && (
                            <>
                                <button onClick={() => setShowCreate(true)}>+ Create Event</button>
                                <button onClick={() => setShowCheckIn(true)}>Check In</button>
                            </>
                        )}
                        <EventsPage onLogout={handleLogout} />
                    </div>
                )
            ) : showRegister ? (
                <RegisterPage onRegister={() => setLoggedIn(true)} onRole={setRole} />
            ) : (
                <div className="card">
                    <LoginPage onLogin={() => setLoggedIn(true)} onRole={setRole} />
                    <button onClick={() => setShowRegister(true)}>Don't have an account? Register</button>
                </div>
            )}
        </div>
    );
}

export default App;