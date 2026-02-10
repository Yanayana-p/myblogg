import React, { useState } from "react";
import "./Contact.css";
import api from "../api"; 

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");

    if (!name || !email || !message) {
      setStatus("Please fill in all fields.");
      return;
    }

    try {
      const res = await api.post("/contact", { name, email, message });
      setStatus(res.data.message);

      // Clear form
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      console.error(err);
      setStatus(err.response?.data?.message || "Cannot connect to server.");
    }
  };

  const alertClass = status.includes("success") ? "alert-success" : "alert-danger";

  return (
    <div className="contact-page">
      <div className="contact-container">

        {/* Left Side Info */}
        <div className="contact-info">
          <h2 className="contact-title">get in <br/><span>touch.</span></h2>
          <p className="contact-blurb">
            Have a question about a tutorial? Or just want to talk about flowers and code? Drop a message!
          </p>

          <div className="contact-links">
            <div className="link-item blue-shadow">
              <strong>EMAIL:</strong> <span>hello@myblog.com</span>
            </div>
            <div className="link-item pink-shadow">
              <strong>FB:</strong> <span>@myblogpage</span>
            </div>
            <div className="link-item yellow-shadow">
              <strong>GIT:</strong> <span>github.com/myblog</span>
            </div>
          </div>
        </div>

        {/* Right Side Form */}
        <div className="contact-form-card">
          {status && (
            <div className={`alert ${alertClass} rounded`} role="alert">
              {status}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>YOUR NAME</label>
              <input
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>YOUR EMAIL</label>
              <input
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>MESSAGE</label>
              <textarea
                placeholder="What's on your mind?"
                rows="4"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
            </div>

            <button type="submit" className="send-btn">SEND MESSAGE ★</button>
          </form>
        </div>
      </div>

      <div className="contact-stamp">POSTAGE PAID</div>
    </div>
  );
}
