import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";
import api from "../api"; 

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [recentReads, setRecentReads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sessionUser = JSON.parse(localStorage.getItem("user"));
        if (sessionUser) setUser(sessionUser);

        // Fetch user's recent reads from backend
        const readsRes = await api.get("/dashboard/recent-reads", {
          params: { email: sessionUser?.email },
        });
        setRecentReads(readsRes.data.recentReads || []);
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="text-center py-5">Loading dashboard...</p>;

  return (
    <div className="dashboard container py-5">

      {/* USER INFO */}
      {user && (
        <div className="user-info p-4 mb-5">
          <h2>Hi, {user.username || user.name}</h2>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      )}

      {/* DASHBOARD STATS */}
      <div className="dashboard-stats mb-5">
        <h3>Stats</h3>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="stat-card p-4">
              <h4>Total Posts Read</h4>
              <p>{recentReads.length}</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="stat-card p-4">
              <h4>Bookmarks</h4>
              <p>0</p> 
            </div>
          </div>
          <div className="col-md-4">
            <div className="stat-card p-4">
              <h4>Saved Drafts</h4>
              <p>0</p> 
            </div>
          </div>
        </div>
      </div>

      {/* RECENT ACTIVITY */}
      <div className="recent-activity mb-5">
        <h3>Recent Reads</h3>
        {recentReads.length === 0 ? (
          <p>No recent activity yet.</p>
        ) : (
          <div className="row g-4">
            {recentReads.map((post, idx) => (
              <div key={idx} className="col-md-4">
                <div className="activity-card p-4">
                  <h5>{post.title}</h5>
                  <small>{new Date(post.date).toLocaleString()}</small>
                  <Link to={post.link} className="btn btn-outline-primary mt-3">
                    Read Again →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
