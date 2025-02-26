import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-light text-center py-4">
      {/* Main Footer Content */}
      <div className="container">
        <p className="mb-2 fw-bold">© {new Date().getFullYear()} FOREX METER. All Rights Reserved.</p>

        {/* Navigation Links */}
        <div className="d-flex justify-content-center gap-3 mb-3 flex-wrap">
          <a href="/privacy-policy" className="text-light text-decoration-none fw-semibold footer-link">
            Privacy Policy
          </a>
          <span>|</span>
          <a href="/terms" className="text-light text-decoration-none fw-semibold footer-link">
            Terms of Use
          </a>
          <span>|</span>
          <a href="/risk-warning" className="text-light text-decoration-none fw-semibold footer-link">
            Risk Warning
          </a>
        </div>
      </div>

      {/* Full-Width Disclaimer Section */}
      <div className="disclaimer-container text-start text-light px-3 py-3">
        <p className="small mb-2">
          <strong>Disclaimer:</strong> This website is for educational purposes only. We do not provide financial advice, investment recommendations, or trading signals. 
          Forex trading regulations vary by country. You are responsible for understanding and complying with the laws in your region before engaging in trading activities.
          The information provided on this website is not a substitute for professional financial consultation.
        </p>
        <p className="small mb-0">
          <strong>Broker Disclaimer:</strong> We do not endorse, recommend, or promote any specific broker. Trading Forex with offshore brokers may be restricted or illegal in certain countries, including India. 
          It is your responsibility to verify the legality of trading in your jurisdiction and consult with a regulatory authority before opening an account with any broker.
          High-risk trading strategies can lead to significant financial loss.
        </p>
      </div>

      {/* Custom Styling */}
      <style jsx>{`
        .footer-link {
          transition: color 0.3s ease-in-out;
        }
        .footer-link:hover {
          color: #f8c300; /* Gold Accent */
        }
        .disclaimer-container {
          background: rgba(255, 255, 255, 0.1);
          width: 100%;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
