import "../components/HomePage.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api"; // Axios instance pointing to backend

export default function HomePage() {
  // Static featured posts (first three)
  const staticFeaturedPosts = [
    {
      id: 1,
      title: "What I Learned Building My First Full-Stack App",
      excerpt:
        "From broken servers to small wins—lessons, mistakes, and growth from my first real project.",
      link: "/post/first-fullstack-app",
    },
    {
      id: 2,
      title: "MongoDB vs SQL: What I Used as a Student Developer",
      excerpt:
        "A beginner-friendly comparison based on real project experience and trial-and-error.",
      link: "/post/mongodb-vs-sql",
    },
    {
      id: 3,
      title: "Mistakes I Made Learning Web Development",
      excerpt:
        "Common beginner errors, misconceptions, and what I wish I knew earlier.",
      link: "/post/web-dev-mistakes",
    },
  ];

  const [featuredPosts, setFeaturedPosts] = useState(staticFeaturedPosts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminPosts = async () => {
      try {
        const res = await api.get("/posts");
        const adminPosts = (res.data.posts || [])
          .filter(post => post.published) 
          .map(post => ({
            id: post._id,
            title: post.title,
            excerpt: post.content.length > 100 ? post.content.substring(0, 100) + "..." : post.content,
            link: `/post/${post._id}`, 
          }));

        
        setFeaturedPosts([...adminPosts, ...staticFeaturedPosts]);
      } catch (err) {
        console.error("Failed to fetch admin posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminPosts();
  }, []);

  return (
    <div className="homepage">

      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="container text-center text-white">
          <h1 className="hero-title">Welcome to the Artful Dev</h1>
          <p className="hero-subtitle">
            A student’s journey through code, creativity, and continuous learning.
          </p>

          {featuredPosts[0] && (
            <Link
              to={featuredPosts[0].link}
              className="btn btn-light btn-lg rounded-pill px-4"
            >
              Explore Blog
            </Link>
          )}
        </div>
      </section>

      {/* INTRO */}
      <section className="intro-section container">
        <h2>A Place to Learn & Reflect</h2>
        <p>
          A quiet corner of the internet where I document lessons learned,
          challenges faced, and growth experienced while building projects
          and learning new technologies.
        </p>
      </section>

      {/* FEATURED POSTS */}
      <section className="featured-section container">
        <h2 className="section-title">Featured Posts</h2>

        {loading ? (
          <p>Loading featured posts...</p>
        ) : (
          <div className="featured-slider-wrapper">
            <div className="featured-slider">
              {featuredPosts.map(post => (
                <div key={post.id} className="col-md-4">
                  <div className="post-card">
                    <h5>{post.title}</h5>
                    <p>{post.excerpt}</p>
                    <Link
                      to={post.link}
                      className="btn btn-outline-primary btn-sm rounded-pill"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* CATEGORIES */}
      <section className="categories-section">
        <div className="container">
          <h2 className="section-title">Explore Topics</h2>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="category-card">
                <h4>Learning Journey</h4>
                <p>Progress, struggles, and lessons from studying and building.</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="category-card">
                <h4>Technology</h4>
                <p>Web development, databases, security, and tools.</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="category-card">
                <h4>Tutorials</h4>
                <p>Step-by-step guides and beginner-friendly explanations.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="newsletter-section">
        <div className="container text-center">
          <h2>Stay Updated</h2>
          <p>
            Subscribe to follow my learning journey and get new posts as they’re published.
          </p>

          <div className="newsletter-form">
            <input type="email" placeholder="Enter your email" />
            <button className="btn btn-primary">Subscribe</button>
          </div>
        </div>
      </section>

    </div>
  );
}
