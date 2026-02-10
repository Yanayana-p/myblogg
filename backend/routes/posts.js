const express = require("express");
const router = express.Router();
const { getDB } = require("../db");
const { ObjectId } = require("mongodb");

// Middleware to check admin
function requireAdmin(req, res, next) {
  try {
    const user = JSON.parse(req.headers["x-user"] || "{}");
    if (!user.isAdmin) return res.status(403).json({ message: "Forbidden: Admins only" });
    next();
  } catch (err) {
    res.status(403).json({ message: "Forbidden: Admins only" });
  }
}

// GET all posts
// Admin sees all posts, normal users see only published
router.get("/", async (req, res) => {
  try {
    const db = getDB();
    const user = JSON.parse(req.headers["x-user"] || "{}");
    const query = user.isAdmin ? {} : { published: true };

    const posts = await db.collection("posts").find(query).sort({ createdAt: -1 }).toArray();
    res.json({ posts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


router.post("/", requireAdmin, async (req, res) => {
  try {
    const { title, content, published } = req.body;
    if (!title || !content) return res.status(400).json({ message: "Title & content required" });

    const db = getDB();
    const result = await db.collection("posts").insertOne({
      title,
      content,
      published: !!published,
      createdAt: new Date(),
    });

    res.status(201).json({ message: "Post created", postId: result.insertedId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// PATCH update a post (admin only)
router.patch("/:id", requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, published } = req.body;

    if (!ObjectId.isValid(id)) return res.status(400).json({ message: "Invalid post ID" });
    if (!title && !content && published === undefined)
      return res.status(400).json({ message: "Nothing to update" });

    const db = getDB();
    const updateData = {};
    if (title) updateData.title = title;
    if (content) updateData.content = content;
    if (published !== undefined) updateData.published = !!published;

    await db.collection("posts").updateOne({ _id: new ObjectId(id) }, { $set: updateData });

    // Return the updated post
    const updatedPost = await db.collection("posts").findOne({ _id: new ObjectId(id) });
    res.json({ message: "Post updated", post: updatedPost });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE a post (admin only)
router.delete("/:id", requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) return res.status(400).json({ message: "Invalid post ID" });

    const db = getDB();
    await db.collection("posts").deleteOne({ _id: new ObjectId(id) });

    res.json({ message: "Post deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
