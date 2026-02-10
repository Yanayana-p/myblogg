const express = require("express");
const router = express.Router();
const { getDB } = require("../db");

function requireAdmin(req, res, next) {
  try {
    const user = JSON.parse(req.headers["x-user"] || "{}");
    if (!user.isAdmin) return res.status(403).json({ message: "Forbidden" });
    next();
  } catch {
    return res.status(403).json({ message: "Forbidden" });
  }
}

// GET all contact messages (admin only)
router.get("/messages", requireAdmin, async (req, res) => {
  try {
    const db = getDB();
    const messages = await db
      .collection("contacts")
      .find()
      .sort({ createdAt: -1 })
      .toArray();

    res.json({ messages });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
