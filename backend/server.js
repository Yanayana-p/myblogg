const express = require("express");
const path = require("path");
const helmet = require("helmet");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// ----- Security Headers -----
app.disable("x-powered-by");          // hide Express
app.use(helmet());                     // default headers
app.use(helmet.noSniff());             // X-Content-Type-Options
app.use(helmet.frameguard({ action: "deny" })); // prevent clickjacking
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:"],
      objectSrc: ["'none'"],
      frameAncestors: ["'none'"],
    },
  })
);

// ----- Middleware -----
app.use(express.json());

// CORS for frontend development 
app.use(
  cors({
    origin: ["http://localhost:3000"], // React dev server
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// ----- API Routes -----

// Test route
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from backend 👋" });
});

// Login route
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  const users = [
    { email: "test@example.com", password: "123456", name: "Diana" },
  ];

  const user = users.find((u) => u.email === email && u.password === password);
  if (user) {
    const { password, ...userData } = user;
    return res.json({ user: userData });
  } else {
    return res.status(401).json({ message: "Invalid email or password" });
  }
});

// Register route
app.post("/api/auth/register", (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const user = { name: username, email };
  return res.status(201).json({ user, message: "User registered successfully" });
});

// ----- Serve React frontend -----
app.use(express.static(path.join(__dirname, "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// ----- Error handler -----
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Internal Server Error" });
});

// ----- Start Server -----
app.listen(PORT, () => {
  console.log(`Secure server running on http://localhost:${PORT}`);
});
