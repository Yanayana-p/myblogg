const express = require("express");
const router = express.Router();
const { getDB } = require("../db");

/* =========================
   USER: Recent Reads
========================= */
router.get("/recent-reads", async (req, res) => {
  try {
    const db = getDB();
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ message: "User email required" });
    }

    const recentReads = await db
      .collection("recentReads")
      .find({ email })
      .sort({ date: -1 })
      .limit(10)
      .toArray();

    res.json({ recentReads });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/* =========================
   ADMIN: Contact Messages
========================= */
router.get("/messages", async (req, res) => {
  try {
    const user = JSON.parse(req.headers["x-user"] || "{}");

    // 🔒 ADMIN CHECK
    if (!user.isAdmin) {
      return res.status(403).json({ message: "Forbidden: Admins only" });
    }

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
