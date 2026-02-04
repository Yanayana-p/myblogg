import "../components/HomePage.css";


export default function HomePage() {
  return (
    <div className="homepage">

      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="container text-center text-white">
          <h1 className="hero-title">Welcome to the Artful Dev</h1>
          <p className="hero-subtitle">
            Thoughts, tutorials, stories, and ideas about life, tech, and creativity.
          </p>
          <button className="btn btn-light btn-lg rounded-pill px-4">
            Explore Blog
          </button>
        </div>
      </section>

      {/* INTRO */}
      <section className="intro-section container">
        <h2>A Place to Learn & Reflect</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          habitant morbi tristique senectus et netus et malesuada fames ac turpis
          egestas. Vestibulum tortor quam, feugiat vitae.
        </p>
      </section>

      {/* FEATURED POSTS */}
      <section className="featured-section container">
        <h2 className="section-title">Featured Posts</h2>
        <div className="row g-4">
          {[1, 2, 3].map((post) => (
            <div key={post} className="col-md-4">
              <div className="post-card">
                <h5>Blog Post Title {post}</h5>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Integer nec odio. Praesent libero.
                </p>
                <button className="btn btn-outline-primary btn-sm rounded-pill">
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="categories-section">
        <div className="container">
          <h2 className="section-title">Explore Categories</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="category-card">
                <h4>Technology</h4>
                <p>Coding tutorials, tools, and digital trends.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="category-card">
                <h4>Personal Stories</h4>
                <p>Life experiences, reflections, and lessons.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="category-card">
                <h4>Tutorials</h4>
                <p>Step-by-step guides designed to help you learn faster.</p>
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
            Subscribe to get the latest posts delivered straight to your inbox.
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
