import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const AboutUs = () => {
  return (
    <div className="about-us-container">
      {/* HEADER */}
      <div className="hero-section">
        <h1>About Us</h1>
        <p>We provide real-time currency strength analysis to help traders make informed decisions.</p>
      </div>

      {/* MAIN CONTENT */}
      <div className="content">
        {/* LEFT: WHY CHOOSE US */}
        <div className="card">
          <h2>Why Choose Us? 💡</h2>
          <ul>
            <li>✅ <strong>Real-Time Data:</strong> Updated currency strength values.</li>
            <li>🔒 <strong>Security First:</strong> We follow strict security protocols.</li>
            <li>📚 <strong>Educational Resources:</strong> Learn Forex trading via our blog.</li>
            <li>✅ <strong>No Biased Predictions:</strong> No buy/sell signals or financial advice.</li>
          </ul>
        </div>

        {/* RIGHT: SECURITY & DISCLAIMER */}
        <div className="card">
          <h2 className="text-danger">Our Commitment to Security 🔐</h2>
          <p>We prioritize <strong>data security</strong> and ensure a safe user experience.</p>

          <h2 className="text-warning">⚠️ Disclaimer</h2>
          <p>Forex trading involves risk. We do not provide financial advice, investment recommendations, or trading signals.</p>
        </div>
      </div>

      {/* CONTACT US */}
      <div className="contact-section">
        <h3>📩 Contact Us</h3>
        <p>Need help? Reach out at <a href="mailto:support@forexmeter.com">support@forexmeter.com</a></p>
      </div>
    </div>
  );
};

export default AboutUs;
