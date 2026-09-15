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
        <div>
            <nav className="navbar">
                <span className="navbar-brand">🎟️ Event Pass Manager</span>
                {loggedIn && (
                    <div className="navbar-actions">
                        {role === 'organiser' && !showCreate && !showCheckIn && (
                            <>
                                <button onClick={() => setShowCreate(true)}>+ Create Event</button>
                                <button onClick={() => setShowCheckIn(true)}>Check In</button>
                            </>
                        )}
                        <button className="btn-outline" onClick={handleLogout}>Logout</button>
                    </div>
                )}
            </nav>
            <div className="main-content">
                {loggedIn ? (
                    showCreate ? (
                        <CreateEventPage onBack={() => setShowCreate(false)} />
                    ) : showCheckIn ? (
                        <CheckInPage onBack={() => setShowCheckIn(false)} />
                    ) : (
                        <EventsPage />
                    )
                ) : showRegister ? (
                    <RegisterPage onRegister={() => setLoggedIn(true)} onRole={setRole} />
                ) : (
                    <div className="card">
                        <LoginPage onLogin={() => setLoggedIn(true)} onRole={setRole} />
                        <button className="btn-secondary" onClick={() => setShowRegister(true)}>Don't have an account? Register</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;