import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api"; // your axios instance
import "../components/AdminPost.css";

export default function AdminPost() {
  const { id } = useParams(); // get post ID from URL
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await api.get("/posts"); // fetch all posts
        const allPosts = res.data.posts || [];
        const currentPost = allPosts.find((p) => p._id === id);
        setPost(currentPost);
      } catch (err) {
        console.error("Failed to fetch post:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) return <p className="text-center py-5">Loading post...</p>;
  if (!post) return <p className="text-center py-5">Post not found.</p>;

  return (
    <div className="blog-page">
      {/* Optional: reading progress bar */}
      <div className="reading-progress-container">
        <div className="reading-progress-bar" id="reading-progress"></div>
      </div>

      <div className="blog-post">
        <Link className="back-link" to="/">← Back to Home</Link>

        <div className="post-header">
          <h1>{post.title}</h1>
          <div className="post-meta">
            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        <div
          className="post-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </div>
  );
}
