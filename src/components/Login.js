import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Login.css is in the same folder
import api from "../api"; // Axios instance with baseURL: http://localhost:5000/api

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      // Call backend login endpoint
      const res = await api.post("/auth/login", { email, password });
      const userData = res.data.user;

      if (!userData) {
        setMessage("Login failed. Please try again.");
        return;
      }

      // Save user session to localStorage
      localStorage.setItem("user", JSON.stringify(userData));
      if (onLogin) onLogin(userData);

      setMessage("Login successful! Redirecting...");

      // Redirect based on role
      setTimeout(() => {
        if (userData.isAdmin) {
          navigate("/admin"); // Admin goes to admin panel
        } else {
          navigate("/dashboard"); // Regular users go to user dashboard
        }
      }, 1000);
    } catch (err) {
      console.error(err);

      const errMsg =
        err.response?.data?.message || "Cannot connect to server.";
      setMessage(errMsg);
    }
  };

  const alertClass = message.includes("successful")
    ? "alert-success"
    : "alert-danger";

  return (
    <div className="floral-login d-flex justify-content-center align-items-center vh-100">
      <div
        className="card p-4 shadow-lg"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h2 className="h3 text-center mb-4 fw-bold">User Login</h2>

        {message && (
          <div className={`alert ${alertClass} rounded`} role="alert">
            {message}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label fw-bold">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="d-grid mt-4">
            <button type="submit" className="btn btn-success fw-bold">
              Log In
            </button>
          </div>

          <p className="mt-3 text-center">
            Don't have an account?
            <span
              className="text-primary text-decoration-underline ms-1"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/register")}
            >
              Register here
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
