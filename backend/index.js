const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
const PORT = 5000;

// ----- Middleware -----

// Allow frontend requests from localhost:3000 (React dev server)
app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true, // if you need cookies
}));

// Security headers
app.use(helmet());
app.use(helmet.contentSecurityPolicy({
  useDefaults: true,
  directives: {
    "default-src": ["'self'"],
    "script-src": ["'self'"],
    "object-src": ["'none'"],
    "img-src": ["'self'"],
    "frame-ancestors": ["'none'"], // prevent clickjacking
  },
}));

// Disable X-Powered-By
app.disable('x-powered-by');

// Parse JSON requests
app.use(express.json());

// ----- Routes -----

// Test route
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from backend 👋' });
});

// Login route
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  // Hardcoded users for testing
  const users = [
    { email: 'test@example.com', password: '123456', name: 'Diana' },
  ];

  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    const { password, ...userData } = user; // remove password
    return res.json({ user: userData });
  } else {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
});

// Register route
app.post('/api/auth/register', (req, res) => {
  const { username, email, password } = req.body;

  // Normally you'd save to DB; for testing, just return success
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const user = { name: username, email };
  return res.status(201).json({ user, message: 'User registered successfully' });
});

// ----- Start Server -----
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
