import { Link } from "react-router-dom";
import "./AppNavbar.css";

export default function AppNavbar({ currentUser }) {
  return (
    <nav className="navbar navbar-expand-lg app-navbar">
      
      {/* Brand */}
      <Link className="navbar-brand app-brand" to="/">
        MyBlog
      </Link>

      {/* Toggler */}
      <button
        className="navbar-toggler app-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* Links */}
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav me-auto app-nav-links">
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/about">About</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/services">Blogs</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/contact">Contact</Link>
          </li>

          {/* Show Dashboard link for normal users */}
          {currentUser && !currentUser.isAdmin && (
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">Dashboard</Link>
            </li>
          )}

          {/* Show Admin link only for admins */}
          {currentUser?.isAdmin && (
            <li className="nav-item">
              <Link className="nav-link" to="/admin">Admin</Link>
            </li>
          )}
        </ul>

        {/* Auth */}
        <ul className="navbar-nav ms-auto app-auth">
          {currentUser ? (
            <>
              <li className="nav-item app-user">
                Hi, <strong>{currentUser.username || currentUser.name}</strong>
              </li>
              <li className="nav-item">
                <Link className="btn app-btn" to="/logout">
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="btn app-btn" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="btn app-btn" to="/register">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
