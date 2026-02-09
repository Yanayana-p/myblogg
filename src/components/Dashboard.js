import React, { useEffect, useState } from 'react';

export default function Dashboard() {
  const [user, setUser] = useState(() => {
    // Get user from localStorage on initial render
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Optional: if you plan to fetch user posts in future
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // If no user, redirect to login (optional)
    if (!user) {
      setError('No user logged in. Please log in first.');
    }
  }, [user]);

  if (!user) {
    return (
      <div className="container mt-4">
        <h2>Dashboard</h2>
        <p className="text-danger">{error || 'Loading user...'}</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2>Dashboard</h2>
      <p>
        Welcome back, <strong>{user.name || user.email}</strong>!
      </p>
      <p>Here you can manage your posts (future feature).</p>
    </div>
  );
}
