import { Link } from "react-router-dom";

export default function AppNavbar({ currentUser }) {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark shadow-lg rounded-4 px-4 py-2 mb-4"
      style={{ background: "linear-gradient(135deg, #6f86d6, #48c6ef)" }}
    >
      {/* Brand */}
      <Link className="navbar-brand fw-bold" to="/">
        MyBlog
      </Link>

      {/* Toggler for mobile */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* Navbar Links */}
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link fw-semibold" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link fw-semibold" to="/about">
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link fw-semibold" to="/services">
              Blogs
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link fw-semibold" to="/contact">
              Contact
            </Link>
          </li>
        </ul>

        {/* User Links */}
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
          {currentUser ? (
            <>
              <li className="nav-item">
                <span className="nav-link text-light">
                  Hi, <strong>{currentUser}</strong>
                </span>
              </li>
              <li className="nav-item">
                <Link className="nav-link btn btn-outline-light btn-sm ms-2 rounded-3" to="/logout">
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link btn btn-outline-light btn-sm rounded-3 me-2" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link btn btn-outline-light btn-sm rounded-3" to="/register">
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
