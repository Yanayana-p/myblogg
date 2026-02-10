import "../components/BlogPost.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function MongoVsSQL() {
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
          <h1>MongoDB vs SQL: What I Used as a Student Developer</h1>
          <div className="post-meta">
            <span>February 2026</span>
            <span>•</span>
            <span>6 min read</span>
          </div>
        </header>

        {/* CONTENT */}
        <article className="post-content">
          <p>
            As a student developer, choosing the right database can feel
            overwhelming. There are so many tutorials and opinions online—some
            swear by MongoDB, others by SQL. When I was building my first
            full-stack apps, I faced the same dilemma. Here’s what I learned
            from trying both.
          </p>

          <h2>SQL: The Classic Relational Database</h2>
          <p>
            SQL databases like MySQL and PostgreSQL are <strong>structured and
            reliable</strong>. You define tables, columns, and relationships
            upfront, which can make your data very organized.
          </p>

          <ul>
            <li><strong>Pros I Loved:</strong></li>
            <ul>
              <li>Strong data integrity with relational rules</li>
              <li>Easy to query structured data using SQL commands</li>
              <li>Great for projects where relationships matter (e.g., students → courses → grades)</li>
            </ul>
            <li><strong>Cons I Struggled With:</strong></li>
            <ul>
              <li>Rigid structure: adding a new field required altering tables</li>
              <li>Can feel overkill for small projects with simple data</li>
              <li>Initial setup can be intimidating as a beginner</li>
            </ul>
          </ul>

          <h2>MongoDB: The Flexible NoSQL Option</h2>
          <p>
            MongoDB stores data as <em>JSON-like documents</em>, which makes it
            flexible and forgiving for student projects. You don’t need to define
            a schema upfront, which is great when you’re experimenting.
          </p>

          <ul>
            <li><strong>Pros I Enjoyed:</strong></li>
            <ul>
              <li>Super fast to prototype and iterate</li>
              <li>Flexible document structure: perfect for messy, evolving projects</li>
              <li>Great integration with JavaScript/Node.js</li>
            </ul>
            <li><strong>Cons I Noticed:</strong></li>
            <ul>
              <li>No enforced relationships, so data integrity is on you</li>
              <li>Complex queries can get messy</li>
              <li>Harder to perform multi-document transactions</li>
            </ul>
          </ul>

          <h2>My Personal Choice as a Student Developer</h2>
          <p>
            For my first full-stack project, I ended up <strong>using MongoDB</strong>.
            Why? Because I was learning, experimenting, and I didn’t want my
            data structure to slow me down. It let me focus on <strong>building
            features and learning backend logic</strong> rather than spending hours
            designing tables.
          </p>

          <blockquote>
            “As a student, flexibility often matters more than perfection.
            MongoDB let me get things done fast, without drowning in SQL syntax.”
          </blockquote>

          <p>
            However, I still explored SQL for later projects, especially when I
            needed <strong>strong relationships and reliable queries</strong>. I
            realized that understanding both databases is valuable—you never know
            when one will fit a project better than the other.
          </p>

          <h2>Tips for Student Developers</h2>
          <ul>
            <li>Prototype first: If you’re unsure, start with MongoDB to get your app working.</li>
            <li>Understand your data: If your project has complex relationships, SQL might save you headaches later.</li>
            <li>Experiment: Try both in small projects to see what clicks for your workflow.</li>
            <li>Keep learning: Knowing both SQL and NoSQL will make you more versatile as a developer.</li>
          </ul>

          <h2>Conclusion</h2>
          <p>
            Both MongoDB and SQL have their strengths and weaknesses. As a student
            developer, the most important thing is <strong>to start building</strong>,
            experiment, and learn from mistakes. Personally, MongoDB gave me speed
            and flexibility, while SQL taught me discipline and structure. Knowing
            both sets you up for success in future projects.
          </p>
        </article>
      </div>
    </div>
  );
}
