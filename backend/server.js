// ----- Imports -----
const express = require("express");
const cors = require("cors");
const { connectDB, getDB } = require("./db");

// ----- Routers -----
const dashboardRoutes = require("./routes/dashboard");
const postsRoutes = require("./routes/posts");

const app = express();
const PORT = 5000;

// ----- Middleware -----
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// =====================
// AUTH ROUTES
// =====================

// ----- REGISTER -----
app.post("/api/auth/register", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  try {
    const db = getDB();
    const existing = await db.collection("users").findOne({ email });

    if (existing) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const result = await db.collection("users").insertOne({
      username,
      email,
      password, // (we’ll hash later)
      isAdmin: false,
      createdAt: new Date(),
    });

    res.status(201).json({
      user: {
        _id: result.insertedId,
        username,
        email,
        isAdmin: false,
      },
      message: "Registered successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ----- LOGIN -----
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const db = getDB();
    const user = await db.collection("users").findOne({ email, password });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.json({
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin || false,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// =====================
// CONTACT ROUTE
// =====================
app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields required" });
  }

  try {
    const db = getDB();
    await db.collection("contacts").insertOne({
      name,
      email,
      message,
      createdAt: new Date(),
    });

    res.status(201).json({ message: "Message sent!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

const adminRoutes = require("./routes/admin");

app.use("/api/admin", adminRoutes);


// =====================
// API ROUTES
// =====================
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/posts", postsRoutes);

// =====================
// START SERVER
// =====================
connectDB()
  .then(() => {
    app.listen(PORT, () =>
      console.log(`✅ Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.error("❌ Failed to connect to DB:", err));
