export default function HomePage() {
  return (
    <div className="container mt-5">

      {/* Hero Section */}
      <div
        className="text-white text-center p-5 rounded-4 shadow-lg mb-5"
        style={{
          background: "linear-gradient(135deg, #6f86d6, #48c6ef)",
        }}
      >
        <h1 className="mb-3">Welcome to My Simple Blog</h1>
        <p className="lead mb-0">
          Read articles, learn new things, and explore my blog posts.
        </p>
      </div>

      {/* Content Cards */}
      <div className="row g-4">
        <div className="col-md-4">
          <div className="card h-100 border-0 shadow-sm rounded-4">
            <div className="card-body">
              <h4 className="card-title">Latest Post</h4>
              <p className="text-muted">
                A preview of the latest articles on the blog.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100 border-0 shadow-sm rounded-4">
            <div className="card-body">
              <h4 className="card-title">Technology</h4>
              <p className="text-muted">
                Articles about programming, coding, and the digital world.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100 border-0 shadow-sm rounded-4">
            <div className="card-body">
              <h4 className="card-title">Personal Stories</h4>
              <p className="text-muted">
                Life lessons, experiences, and meaningful reflections.
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
