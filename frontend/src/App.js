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
    const [darkMode, setDarkMode] = useState(false);

    const toggleTheme = () => {
        setDarkMode(!darkMode);
        document.body.classList.toggle('dark');
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        setLoggedIn(false);
        setRole(null);
    };

    return (
        <div>
            <nav className="navbar">
    <span className="navbar-brand">Event Pass Manager</span>
    <div className="navbar-actions">
        {role === 'organiser' && loggedIn && !showCreate && !showCheckIn && (
            <>
                <button onClick={() => setShowCreate(true)}>+ Create Event</button>
                <button onClick={() => setShowCheckIn(true)}>Check In</button>
            </>
        )}
        {loggedIn && (
            <button className="btn-outline" onClick={handleLogout}>Logout</button>
        )}
    </div>
</nav>
<div
    style={{
        position: 'fixed',
        top: '80px',
        right: '20px',
        zIndex: 100,
        cursor: 'grab'
    }}
    draggable="true"
>
    <button onClick={toggleTheme} style={{
        borderRadius: '50%',
        width: '42px',
        height: '42px',
        padding: '0',
        fontSize: '1.2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }}>
        {darkMode ? '☀️' : '🌙'}
    </button>
</div>
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
                    <RegisterPage
                        onRegister={() => setLoggedIn(true)}
                        onRole={setRole}
                        onBack={() => setShowRegister(false)}
                    />
                ) : (
                    <div className="card">
                        <LoginPage onLogin={() => setLoggedIn(true)} onRole={setRole} />
                        <button className="btn-secondary" onClick={() => setShowRegister(true)}>
                            Don't have an account? Register
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;