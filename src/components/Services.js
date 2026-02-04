import "../components/Services.css";

export default function Services() {
  return (
    <div className=" services-page mt-5">
      
      <h2 className="services-title">Stories, Lessons & Ideas</h2>

      <p className="services-intro">
        Welcome to the heart of this blog. This is where curiosity meets
        experience — where small ideas turn into meaningful lessons.
        Whether you’re just starting your coding journey, exploring new
        tools, or simply looking for inspiration, these articles are written
        to guide, encourage, and grow with you.
      </p>

      <p className="services-intro">
        Just like on the homepage, this space is about learning and reflecting.
        Some posts will teach you something practical, others may share
        personal stories or creative thoughts — but all of them are written
        with one goal in mind: to help you move forward, one idea at a time.
      </p>

      <div className="list-group mt-4">
        <a className="list-group-item list-group-item-action">
          <strong>How to Start Learning React</strong>
          <p className="mb-0 text-muted small">
            A beginner-friendly guide to understanding components, state,
            and how everything fits together.
          </p>
        </a>

        <a className="list-group-item list-group-item-action">
          <strong>Why Bootstrap is Great for Beginners</strong>
          <p className="mb-0 text-muted small">
            Learn how Bootstrap helps you build clean, responsive layouts
            without feeling overwhelmed.
          </p>
        </a>

        <a className="list-group-item list-group-item-action">
          <strong>Top 5 Coding Tips for New Developers</strong>
          <p className="mb-0 text-muted small">
            Simple but powerful habits that can make your learning journey
            smoother and more enjoyable.
          </p>
        </a>
      </div>
    </div>
  );
}
