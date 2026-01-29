export default function About() {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-9 col-lg-8">
          <div className="card border-0 shadow-lg rounded-4 overflow-hidden">

            {/* Header */}
            <div
              className="text-white text-center py-4"
              style={{
                background: "linear-gradient(135deg, #6f86d6, #48c6ef)",
              }}
            >
              <h2 className="mb-1">About This Blog</h2>
              <p className="mb-0 opacity-75">
                A simple place to share thoughts and ideas
              </p>
            </div>

            {/* Body */}
            <div className="card-body p-4 bg-light">
              <p className="fs-5">
                This blog was built using <strong>React</strong> and{" "}
                <strong>Bootstrap</strong>, focusing on clean design and smooth
                navigation.
              </p>

              <p className="text-muted">
                It highlights essential concepts such as routing, reusable
                components, and responsive layouts while keeping the interface
                user-friendly.
              </p>

              <div className="d-flex gap-3 mt-4">
                <span className="badge bg-primary px-3 py-2">React</span>
                <span className="badge bg-info text-dark px-3 py-2">
                  Bootstrap
                </span>
                <span className="badge bg-success px-3 py-2">
                  Responsive Design
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
