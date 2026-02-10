import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api";
import "../components/BlogPost.css";

export default function AdminPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await api.get(`/posts/${id}`); // GET single post
        setPost(res.data.post);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPost();
  }, [id]);

  if (!post) return <p>Loading...</p>;

  return (
    <div className="container py-5">
      <h1>{post.title}</h1>
      <p><strong>Published:</strong> {new Date(post.createdAt).toLocaleDateString()}</p>
      <div>{post.content}</div>
    </div>
  );
}
