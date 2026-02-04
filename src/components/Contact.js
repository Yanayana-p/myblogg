import "../components/Contact.css";

export default function Contact() { 
  return ( 
    <div className="contact-page">
      <div className="contact-container">
        
        {/* Left Side: The Info "Stamps" */}
        <div className="contact-info">
          <h2 className="contact-title">get in <br/><span>touch.</span></h2>
          <p className="contact-blurb">
            Have a question about a tutorial? Or just want to talk about flowers and code? Drop a message!
          </p>
          
          <div className="contact-links">
            <div className="link-item blue-shadow">
              <strong>EMAIL:</strong> <span>hello@myblog.com</span>
            </div>
            <div className="link-item pink-shadow">
              <strong>FB:</strong> <span>@myblogpage</span>
            </div>
            <div className="link-item yellow-shadow">
              <strong>GIT:</strong> <span>github.com/myblog</span>
            </div>
          </div>
        </div>

        {/* Right Side: The Message Form */}
        <div className="contact-form-card">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <label>YOUR NAME</label>
              <input type="text" placeholder="John Doe" />
            </div>
            <div className="form-group">
              <label>YOUR EMAIL</label>
              <input type="email" placeholder="john@example.com" />
            </div>
            <div className="form-group">
              <label>MESSAGE</label>
              <textarea placeholder="What's on your mind?" rows="4"></textarea>
            </div>
            <button type="submit" className="send-btn">SEND MESSAGE ★</button>
          </form>
        </div>

      </div>
      
      {/* Decorative floating element */}
      <div className="contact-stamp">POSTAGE PAID</div>
    </div> 
  ); 
}