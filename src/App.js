import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';

// IMPORT COMPONENTS
import AppNavbar from './components/AppNavbar.js';
import HomePage from './components/HomePage.js';
import About from './components/About.js';
import Services from './components/Services.js';
import Contact from './components/Contact.js';
import Login from './components/Login.js';
import Register from './components/Register.js';
import Dashboard from './components/Dashboard.js';
import Footer from './components/Footer.js';

// SESSION FUNCTIONS
function getSessionUser() {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

function clearSessionUser() {
  localStorage.removeItem("user");
}

// LOGOUT COMPONENT
function Logout({ onLogout }) {
  const navigate = useNavigate();
  useEffect(() => {
    clearSessionUser();
    if (onLogout) onLogout();
    navigate('/login');
  }, [navigate, onLogout]);

  return null;
}

// PROTECTED ROUTE WRAPPER
function PrivateRoute({ children }) {
  const user = getSessionUser();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default function App() {
  const [currentUser, setCurrentUser] = useState(getSessionUser());

  // LOGIN HANDLER
  function handleLogin(user) {
    // user is expected to be an object { name, email }
    setCurrentUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  }

  // LOGOUT HANDLER
  function handleLogout() {
    setCurrentUser(null);
    clearSessionUser();
  }

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <AppNavbar currentUser={currentUser} />

        <Routes>
          {/* Public Pages */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />

          {/* Login/Register with redirect if already logged in */}
          <Route
            path="/login"
            element={
              currentUser ? <Navigate to="/home" replace /> : <Login onLogin={handleLogin} />
            }
          />
          <Route
            path="/register"
            element={
              currentUser ? <Navigate to="/home" replace /> : <Register />
            }
          />

          {/* Protected Route */}
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          {/* Logout */}
          <Route path="/logout" element={<Logout onLogout={handleLogout} />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}
