import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import api from "../api";

export default function Admin() {
  const adminUser = JSON.parse(localStorage.getItem("user"));

  const [posts, setPosts] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    published: false,
  });

  const [message, setMessage] = useState("");

  // ---------------- FETCH DATA ----------------
  useEffect(() => {
    if (!adminUser?.isAdmin) return;

    fetchPosts();
    fetchContacts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await api.get("/posts", {
        headers: { "x-user": JSON.stringify(adminUser) },
      });
      setPosts(res.data.posts || []);
    } catch (err) {
      console.error("Failed to fetch posts", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchContacts = async () => {
    try {
      const res = await api.get("/dashboard/messages", {
        headers: { "x-user": JSON.stringify(adminUser) },
      });
      setContacts(res.data.messages || []);
    } catch (err) {
      console.error("Failed to fetch messages", err);
    }
  };

  // ---------------- ACTIONS ----------------
  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!newPost.title || !newPost.content) {
      setMessage("Title and content are required.");
      return;
    }

    try {
      const res = await api.post("/posts", newPost, {
        headers: { "x-user": JSON.stringify(adminUser) },
      });
      setMessage(res.data.message || "Post created");
      setNewPost({ title: "", content: "", published: false });
      fetchPosts();
    } catch (err) {
      setMessage("Failed to create post");
    }
  };

  const togglePublished = async (post) => {
    try {
      await api.patch(
        `/posts/${post._id}`,
        { published: !post.published },
        { headers: { "x-user": JSON.stringify(adminUser) } }
      );
      fetchPosts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeletePost = async (id) => {
    if (!window.confirm("Delete this post?")) return;

    try {
      await api.delete(`/posts/${id}`, {
        headers: { "x-user": JSON.stringify(adminUser) },
      });
      fetchPosts();
    } catch (err) {
      console.error(err);
    }
  };

  // ---------------- ACCESS CONTROL ----------------
  if (!adminUser || !adminUser.isAdmin) {
    return (
      <div className="dashboard container py-5">
        <h2>Access Denied</h2>
        <p>Admins only.</p>
      </div>
    );
  }

  if (loading) return <p className="text-center py-5">Loading...</p>;

  // ---------------- UI ----------------
  return (
    <div className="dashboard container py-5">
      {/* ADMIN INFO */}
      <div className="user-info p-4 mb-5">
        <h2>Hi, {adminUser.username || adminUser.name}</h2>
        <p><strong>Email:</strong> {adminUser.email}</p>
        <p><strong>Role:</strong> Admin</p>
      </div>

      {message && (
        <div className="alert alert-success mb-4">{message}</div>
      )}

      {/* CREATE + MANAGE POSTS */}
      <div className="row g-4 mb-5">
        {/* CREATE POST */}
        <div className="col-md-6">
          <div className="activity-card p-4 h-100">
            <h3>Create Post</h3>
            <form onSubmit={handleCreatePost}>
              <input
                className="form-control mb-3"
                placeholder="Post title"
                value={newPost.title}
                onChange={(e) =>
                  setNewPost({ ...newPost, title: e.target.value })
                }
              />

              <textarea
                className="form-control mb-3"
                rows={5}
                placeholder="Post content"
                value={newPost.content}
                onChange={(e) =>
                  setNewPost({ ...newPost, content: e.target.value })
                }
              />

              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={newPost.published}
                  onChange={(e) =>
                    setNewPost({ ...newPost, published: e.target.checked })
                  }
                />
                <label className="form-check-label">
                  Publish immediately
                </label>
              </div>

              <button className="btn btn-success fw-bold">
                Create Post
              </button>
            </form>
          </div>
        </div>

        {/* MANAGE POSTS */}
        <div className="col-md-6">
          <div className="activity-card p-4 h-100">
            <h3>Manage Posts</h3>

            {posts.length === 0 ? (
              <p>No posts yet.</p>
            ) : (
              posts.map((post) => (
                <div key={post._id} className="mb-3">
                  <strong>{post.title}</strong>
                  <p className="small mb-1">
                    Status: {post.published ? "Published" : "Draft"}
                  </p>

                  <button
                    className="btn btn-outline-primary btn-sm me-2"
                    onClick={() => togglePublished(post)}
                  >
                    {post.published ? "Unpublish" : "Publish"}
                  </button>

                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => handleDeletePost(post._id)}
                  >
                    Delete
                  </button>
                  <hr />
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* CONTACT MESSAGES */}
      <div className="recent-activity">
        <h3>User Messages</h3>

        {contacts.length === 0 ? (
          <p>No messages yet.</p>
        ) : (
          contacts.map((msg) => (
            <div key={msg._id} className="activity-card mb-3 p-4">
              <h5>{msg.name}</h5>
              <small>{msg.email}</small>
              <p className="mt-2">{msg.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
