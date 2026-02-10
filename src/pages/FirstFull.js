import "../components/BlogPost.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function FirstFull() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrolled = (scrollTop / docHeight) * 100;
      setScrollProgress(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="blog-page">
      {/* READING PROGRESS BAR */}
      <div className="reading-progress-container">
        <div
          className="reading-progress-bar"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      <div className="blog-post container py-5">
        {/* BACK NAV */}
        <Link to="/" className="back-link">
          ← Back to Home
        </Link>

        {/* HEADER */}
        <header className="post-header">
          <h1>What I Learned Building My First Full-Stack App</h1>

          <div className="post-meta">
            <span>February 2026</span>
            <span>•</span>
            <span>5 min read</span>
          </div>
        </header>

        {/* CONTENT */}
        <article className="post-content">
          <p>
            Building my first full-stack application was both exciting and
            overwhelming. Tutorials made everything look easy—but real projects
            quickly humbled me.
          </p>

          <h2>Things Didn’t Work the First Time</h2>
          <p>
            From server crashes to database connection errors, I spent more time
            debugging than coding new features. At first, this felt discouraging.
          </p>

          <p>
            Over time, I realized that debugging <em>is</em> the learning process.
            Every error forced me to understand how things actually work.
          </p>

          <h2>Small Wins Matter</h2>
          <p>
            Seeing my API return data correctly or my frontend finally display
            real content felt incredibly rewarding. Those small wins kept me going.
          </p>

          <blockquote>
            “You don’t learn by building perfect apps—you learn by fixing broken
            ones.”
          </blockquote>

          <h2>What I’d Do Differently</h2>
          <ul>
            <li>Plan features before coding</li>
            <li>Read error messages carefully</li>
            <li>Commit code more often</li>
          </ul>

          <p>
            This project taught me patience, problem-solving, and confidence.
            It wasn’t perfect—but it was mine.
          </p>
        </article>
      </div>
    </div>
  );
}
