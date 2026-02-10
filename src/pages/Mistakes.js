import "../components/BlogPost.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Mistakes() {
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
        {/* BACK LINK */}
        <Link to="/" className="back-link">
          ← Back to Home
        </Link>

        {/* HEADER */}
        <header className="post-header">
          <h1>Mistakes I Made Learning Web Development</h1>
          <div className="post-meta">
            <span>February 2026</span>
            <span>•</span>
            <span>5 min read</span>
          </div>
        </header>

        {/* CONTENT */}
        <article className="post-content">
          <p>
            Learning web development as a beginner can be exciting—but also
            frustrating. I made plenty of mistakes along the way, some small,
            some costly. Reflecting on these errors taught me how to code
            smarter and avoid unnecessary headaches. Here’s what I wish I knew
            when I started.
          </p>

          <h2>1. Skipping the Fundamentals</h2>
          <p>
            When I first started, I jumped straight into building apps without
            mastering the basics of HTML, CSS, and JavaScript.
          </p>
          <ul>
            <li><strong>Mistakes I Made:</strong></li>
            <ul>
              <li>Tried frameworks like React without understanding plain JS</li>
              <li>Struggled with CSS layouts and responsiveness</li>
              <li>Relied heavily on copy-pasting code from tutorials</li>
            </ul>
          </ul>
          <blockquote>
            “Master the fundamentals first; frameworks are just tools—you need
            the foundation to use them well.”
          </blockquote>

          <h2>2. Not Using Version Control Early</h2>
          <p>
            I didn’t start using Git right away, which caused messy projects and
            lost code.
          </p>
          <ul>
            <li>Overwriting files accidentally</li>
            <li>Forgetting previous working versions</li>
            <li>Difficulty collaborating on group projects</li>
          </ul>
          <p>
            <strong>Tip:</strong> Start with Git and GitHub from day one. Commit
            often and learn branching—it saves so much stress later.
          </p>

          <h2>3. Overcomplicating Projects</h2>
          <p>
            I tried building “full-stack apps” before I could confidently manage
            front-end or back-end basics.
          </p>
          <ul>
            <li>Spending hours debugging issues I didn’t fully understand</li>
            <li>Creating features I didn’t need</li>
            <li>Feeling overwhelmed and losing motivation</li>
          </ul>
          <p>Lesson learned: start small and build one concept at a time.</p>

          <h2>4. Ignoring Best Practices</h2>
          <p>
            Early on, I ignored code structure, naming conventions, and file
            organization.
          </p>
          <ul>
            <li>Confusing folder structures</li>
            <li>Hard-to-read code</li>
            <li>Difficulty revisiting older projects</li>
          </ul>
          <p>
            <strong>Tip:</strong> Follow best practices from the beginning.
            Small habits like consistent naming save a lot of time.
          </p>

          <h2>5. Not Asking for Help</h2>
          <p>
            I thought I had to figure everything out alone, which slowed my
            progress.
          </p>
          <ul>
            <li>Stuck on simple bugs for hours</li>
            <li>Hesitant to ask questions online</li>
            <li>Not joining communities or coding groups</li>
          </ul>
          <p>
            <strong>Lesson Learned:</strong> Ask questions, join developer
            communities, and learn from others’ experiences. Most developers
            are happy to help beginners.
          </p>

          <h2>Conclusion</h2>
          <p>
            Mistakes are part of the learning process. Looking back, I realize
            every error taught me something valuable—from fundamentals to best
            practices, version control, and project scope. If you’re a beginner,
            embrace your mistakes, learn from them, and don’t rush the process.
            Web development is a journey—and every misstep is a lesson in
            disguise.
          </p>
        </article>
      </div>
    </div>
  );
}
