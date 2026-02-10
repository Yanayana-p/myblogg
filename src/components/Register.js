import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import api from "../api"; 

const Register = ({ onRegister }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      // Call backend API
      const res = await api.post("/auth/register", { username, email, password });
      const userData = res.data.user;

      // Optional: store in session
      localStorage.setItem("user", JSON.stringify(userData));
      if (onRegister) onRegister(userData);

      setMessage("Registration successful! Redirecting to login...");

      // Redirect after 1.5s
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      console.error(err);

      // Show backend error message if available
      const errMsg = err.response?.data?.message || "Cannot connect to server.";
      setMessage(errMsg);
    }
  };

  const alertClass = message.includes("successful") ? "alert-success" : "alert-danger";

  return (
    <div className="register-page d-flex justify-content-center align-items-center vh-100">
      <div className="card register-card p-4 shadow-lg" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="register-title text-center mb-4 fw-bold">Register Account</h2>

        {message && (
          <div className={`alert ${alertClass} rounded`} role="alert">
            {message}
          </div>
        )}

        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="form-label fw-bold" htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-control"
              placeholder="Your username"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              placeholder="user@example.com"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              placeholder="********"
              required
            />
          </div>

          <div className="d-grid mt-4">
            <button type="submit" className="btn btn-success fw-bold">Register</button>
          </div>

          <p className="mt-3 text-center">
            Already have an account?
            <span
              className="text-primary text-decoration-underline ms-1"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/login")}
            >
              Login here
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
