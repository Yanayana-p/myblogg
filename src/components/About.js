import React, { useState } from "react";
import "../components/About.css";

export default function About() {
  // Logic for a toggleable FAQ or "Fun Facts" section to add interactivity
  const [activeFaq, setActiveFaq] = useState(null);

  const missionPoints = [
    { title: "The Why", text: "I started this blog to bridge the gap between complex code and creative storytelling." },
    { title: "The How", text: "Built with a 'Neo-Brutalist' aesthetic, using React to manage state and Bootstrap for grid precision." },
    { title: "The Goal", text: "To create a digital garden where ideas can grow alongside my technical skills." }
  ];

  const faqs = [
    { q: "What's the tech stack?", a: "React 18, Bootstrap 5, and custom CSS-in-JS logic." },
    { q: "Why the flower theme?", a: "Because code, like nature, requires the right environment to bloom." }
  ];

  return (
    <div className="about-wrapper">
      {/* 1. HERO SECTION: Big, Bold, Direct */}
      <section className="about-hero">
        <div className="checker-strip"></div>
        <h1 className="hero-title">A Digital <br/><span>Garden.</span></h1>
        <div className="author-badge">BY YOUR NAME</div>
      </section>

      {/* 2. THE STORY: Breaking the 'Flat' content with asymmetric layout */}
      <section className="about-story-grid container">
        <div className="row align-items-center">
          <div className="col-lg-6 mb-5">
            <div className="story-image-container">
               <div className="image-offset-bg"></div>
               <div className="main-image-box">
                  <span className="image-caption">Workspace // 2024</span>
               </div>
            </div>
          </div>
          
          <div className="col-lg-6">
            <h2 className="section-label">THE STORY</h2>
            <p className="editorial-lead">
              This blog is an experiment in <strong>creative development</strong>. 
              While most tech blogs are gray and clinical, I wanted a space that 
              feels alive, vibrant, and a little bit weird.
            </p>
            <p className="body-copy">
              Beyond the code, this is a place where I document my journey as a 
              developer. Every component here was hand-crafted to prove that 
              functional software can also be beautiful.
            </p>
          </div>
        </div>
      </section>

      {/* 3. DYNAMIC MISSION SECTION */}
      <section className="mission-section">
        <div className="container">
          <div className="row">
            {missionPoints.map((point, index) => (
              <div key={index} className="col-md-4">
                <div className="mission-card">
                  <span className="mission-num">0{index + 1}</span>
                  <h3>{point.title}</h3>
                  <p>{point.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE FAQ: Adding 'Weight' to the content */}
      <section className="about-faq container">
        <h2 className="text-center mb-5">Curiosities</h2>
        <div className="faq-list">
          {faqs.map((faq, i) => (
            <div 
              key={i} 
              className={`faq-item ${activeFaq === i ? 'active' : ''}`}
              onClick={() => setActiveFaq(activeFaq === i ? null : i)}
            >
              <div className="faq-question">
                <span>{faq.q}</span>
                <span className="faq-icon">{activeFaq === i ? '−' : '+'}</span>
              </div>
              {activeFaq === i && <div className="faq-answer">{faq.a}</div>}
            </div>
          ))}
        </div>
      </section>
      
      {/* Marquee Footer for that 'atnn design' feel */}
      <div className="marquee-wrap">
        <div className="marquee-content">
          THANKS FOR STOPPING BY • KEEP CREATING • STAY CURIOUS • 
          THANKS FOR STOPPING BY • KEEP CREATING • STAY CURIOUS • 
        </div>
      </div>
    </div>
  );
}