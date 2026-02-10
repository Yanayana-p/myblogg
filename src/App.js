import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate
} from 'react-router-dom';

// IMPORT COMPONENTS
import AppNavbar from './components/AppNavbar.js';
import HomePage from './components/HomePage.js';
import About from './components/About.js';
import Services from './components/Services.js';
import Contact from './components/Contact.js';
import Login from './components/Login.js';
import Register from './components/Register.js';
import Dashboard from './components/Dashboard.js';
import AdminPage from './components/Admin.js';
import Footer from './components/Footer.js';

// BLOG POST PAGE
import FirstFull from './pages/FirstFull.js';
import MongovsSQL from './pages/MongovsSQL.js';
import Mistakes from './pages/Mistakes.js';
import AdminPost from './pages/AdminPost.js';

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
function PrivateRoute({ children, adminOnly = false }) {
  const user = getSessionUser();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (adminOnly && !user.isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
}

export default function App() {
  const [currentUser, setCurrentUser] = useState(getSessionUser());

  // LOGIN HANDLER
  function handleLogin(user) {
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
          {/* PUBLIC PAGES */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />

          {/* BLOG POST (PUBLIC) */}
          <Route path="/post/first-fullstack-app" element={<FirstFull />} />
          <Route path="/post/mongodb-vs-sql" element={<MongovsSQL />} />
          <Route path="/post/web-dev-mistakes" element={<Mistakes />} />
          <Route path ="/post/:id" element={<AdminPost />} />

          {/* LOGIN / REGISTER */}
          <Route
            path="/login"
            element={
              currentUser
                ? <Navigate to={currentUser.isAdmin ? "/admin" : "/dashboard"} replace />
                : <Login onLogin={handleLogin} />
            }
          />
          <Route
            path="/register"
            element={
              currentUser
                ? <Navigate to={currentUser.isAdmin ? "/admin" : "/dashboard"} replace />
                : <Register />
            }
          />

          {/* PROTECTED ROUTES */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <PrivateRoute adminOnly={true}>
                <AdminPage />
              </PrivateRoute>
            }
          />

          {/* LOGOUT */}
          <Route path="/logout" element={<Logout onLogout={handleLogout} />} />

          {/* FALLBACK */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}
