import { useState } from 'react';
import './App.css';
import EventsPage from './pages/EventsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CreateEventPage from './pages/CreateEventPage';
import CheckInPage from './pages/CheckInPage';
import DashboardPage from './pages/DashboardPage';
import UserDashboardPage from './pages/UserDashboardPage';
import DeleteEventPage from './pages/DeleteEventPage';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [showCheckIn, setShowCheckIn] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [role, setRole] = useState(localStorage.getItem('role'));
  const [darkMode, setDarkMode] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark');
  };

  const resetViews = () => {
    setShowDashboard(false);
    setShowCreate(false);
    setShowCheckIn(false);
    setShowDelete(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setLoggedIn(false);
    setRole(null);
    resetViews();
  };

  return (
    <div>
      <nav className="navbar">
        <span className="navbar-brand">Event Pass Manager</span>
      </nav>
      
      {/* Dark Mode Toggle Circle */}
      <div 
        style={{ 
          position: 'fixed', 
          top: '70px', 
          right: '20px', 
          zIndex: 100 
        }}
      >
        <button 
          onClick={toggleTheme} 
          style={{ 
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: darkMode ? 'rgba(30, 30, 30, 0.85)' : 'rgba(255, 253, 245, 0.85)',
            backdropFilter: 'blur(8px)',
            border: darkMode ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(212, 180, 131, 0.5)',
            boxShadow: '0 4px 14px rgba(0, 0, 0, 0.12)',
            padding: '0', 
            margin: '0',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: darkMode ? '#d4af37' : '#3d0000',
            transition: 'all 0.25s ease'
          }}
        >
          {darkMode ? (
            /* Sun Icon */
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          ) : (
            /* Moon Icon */
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>
      </div>

      {loggedIn ? (
        <div className="app-layout">
          <div className="sidebar">
            <div className="sidebar-title">EPM</div>
            <div className="sidebar-nav">
              {/* Events Icon */}
              <button 
                className={!showDashboard && !showCreate && !showCheckIn && !showDelete ? 'active' : ''} 
                onClick={resetViews}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"/></svg>
                <span>Events</span>
              </button>

              {/* Dashboard Icon */}
              <button 
                className={showDashboard ? 'active' : ''} 
                onClick={() => { resetViews(); setShowDashboard(true); }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/></svg>
                <span>Dashboard</span>
              </button>

              {/* Organiser Specific Navigation */}
              {role === 'organiser' && (
                <>
                  <button 
                    className={showCreate ? 'active' : ''} 
                    onClick={() => { resetViews(); setShowCreate(true); }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                    <span>Create Event</span>
                  </button>

                  <button 
                    className={showCheckIn ? 'active' : ''} 
                    onClick={() => { resetViews(); setShowCheckIn(true); }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                    <span>Check In</span>
                  </button>

                  {/* Delete Event Sidebar Button */}
                  <button 
                    className={showDelete ? 'active' : ''} 
                    onClick={() => { resetViews(); setShowDelete(true); }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      <line x1="10" y1="11" x2="10" y2="17"></line>
                      <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                    <span>Delete Event</span>
                  </button>
                </>
              )}

              {/* Logout Icon */}
              <button onClick={handleLogout}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                <span>Logout</span>
              </button>
            </div>
          </div>

          <div className="main-area">
            <div className="main-content">
              {showDashboard ? (
                role === 'organiser' ? (
                  <DashboardPage onBack={resetViews} />
                ) : (
                  <UserDashboardPage onBack={resetViews} />
                )
              ) : showCreate ? (
                <CreateEventPage onBack={resetViews} />
              ) : showCheckIn ? (
                <CheckInPage onBack={resetViews} />
              ) : showDelete ? (
                <DeleteEventPage onBack={resetViews} />
              ) : (
                <EventsPage />
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="auth-content">
          {showRegister ? (
            <RegisterPage onRegister={() => setLoggedIn(true)} onRole={setRole} onBack={() => setShowRegister(false)} />
          ) : (
            <div className="card">
              <LoginPage onLogin={() => setLoggedIn(true)} onRole={setRole} />
              <button className="btn-secondary" onClick={() => setShowRegister(true)}>
                Don't have an account? Register
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;