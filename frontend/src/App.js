import { useState } from 'react';
import './App.css';
import EventsPage from './pages/EventsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CreateEventPage from './pages/CreateEventPage';
import CheckInPage from './pages/CheckInPage';
import DashboardPage from './pages/DashboardPage';

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [showCreate, setShowCreate] = useState(false);
    const [showCheckIn, setShowCheckIn] = useState(false);
    const [role, setRole] = useState(localStorage.getItem('role'));
    const [darkMode, setDarkMode] = useState(false);
    const [showDashboard, setShowDashboard] = useState(false);

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
            <div className="navbar-wrapper">
                <nav className="navbar">
                    <span className="navbar-brand">Event Pass Manager</span>
                </nav>
                <div className="nav-lower">
                    <div className="nav-lower-left">
                        {role === 'organiser' && loggedIn && (
                            <>
                                <button onClick={() => { setShowDashboard(true); setShowCreate(false); setShowCheckIn(false); }}>Dashboard</button>
                                <button onClick={() => { setShowCreate(true); setShowDashboard(false); setShowCheckIn(false); }}>+ Create Event</button>
                            </>
                        )}
                    </div>
                    <div className="nav-lower-right">
                        {role === 'organiser' && loggedIn && (
                            <button onClick={() => { setShowCheckIn(true); setShowDashboard(false); setShowCreate(false); }}>Check In</button>
                        )}
                        {loggedIn && (
                            <button onClick={handleLogout}>Logout</button>
                        )}
                    </div>
                </div>
            </div>
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
                <button
                    onClick={toggleTheme}
                    className="planet-toggle"
                    style={{
                        background: 'transparent',
                        border: 'none',
                        boxShadow: 'none',
                        outline: 'none',
                        padding: '0',
                        fontSize: '2.5rem',
                        lineHeight: '1',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'transform 0.3s ease, filter 0.3s ease',
                        WebkitTapHighlightColor: 'transparent'
                    }}
                >
                    {darkMode ? '🌕' : '🌑'}
                </button>
            </div>
            <div className="main-content">
                {loggedIn ? (
                    showDashboard ? (
                        <DashboardPage onBack={() => setShowDashboard(false)} />
                    ) : showCreate ? (
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