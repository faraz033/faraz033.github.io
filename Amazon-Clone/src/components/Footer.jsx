import React from 'react';

export default function Footer({ setCurrentPage }) {
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-container" aria-label="Footer Navigation">
      {/* Back to top banner */}
      <div className="back-to-top-btn" onClick={handleBackToTop}>
        Back to top
      </div>

      {/* Main links list */}
      <div className="footer-links container">
        <div className="footer-col">
          <h3>Get to Know Us</h3>
          <ul>
            <li>Careers</li>
            <li>Blog</li>
            <li>About Amazon</li>
            <li>Investor Relations</li>
            <li>Amazon Devices</li>
            <li>Amazon Science</li>
          </ul>
        </div>
        <div className="footer-col">
          <h3>Make Money with Us</h3>
          <ul>
            <li>Sell products on Amazon</li>
            <li>Sell on Amazon Business</li>
            <li>Sell apps on Amazon</li>
            <li>Become an Affiliate</li>
            <li>Advertise Your Products</li>
            <li>Self-Publish with Us</li>
          </ul>
        </div>
        <div className="footer-col">
          <h3>Amazon Payment Products</h3>
          <ul>
            <li>Amazon Rewards Visa Card</li>
            <li>Amazon.com Store Card</li>
            <li>Amazon Secured Card</li>
            <li>Amazon Business Card</li>
            <li>Shop with Points</li>
            <li>Credit Card Marketplace</li>
          </ul>
        </div>
        <div className="footer-col">
          <h3>Let Us Help You</h3>
          <ul>
            <li>Amazon and COVID-19</li>
            <li>Your Account</li>
            <li>Your Orders</li>
            <li>Shipping Rates & Policies</li>
            <li>Amazon Prime</li>
            <li>Returns & Replacements</li>
            <li>Help</li>
          </ul>
        </div>
      </div>

      <div className="footer-divider" />

      {/* Bottom Bar branding and copyright */}
      <div className="footer-bottom container">
        <div className="footer-logo-row">
          <div className="footer-logo" onClick={() => { setCurrentPage('home'); handleBackToTop(); }}>
            <span className="logo-text">amazon</span>
            <span className="logo-dot">.prime</span>
          </div>
          
          <div className="footer-lang-selector">
            <span>🌐 English</span>
            <span>USD - U.S. Dollar</span>
            <span>🇺🇸 United States</span>
          </div>
        </div>

        <div className="footer-copyright-row">
          <p>© 1996-2026, Amazon.com, Inc. or its affiliates. Simulated Amazon Clone.</p>
          <p className="college-credits">🎓 Submission for College Web Development Project. All Rights Reserved.</p>
        </div>
      </div>

      <style>{`
        .footer-container {
          background-color: #232f3e;
          color: #ddd;
          width: 100%;
          text-align: left;
          font-size: 13px;
        }

        .back-to-top-btn {
          background-color: #37475a;
          color: white;
          text-align: center;
          padding: 15px 0;
          cursor: pointer;
          font-weight: 500;
          transition: background-color var(--transition-fast);
        }
        .back-to-top-btn:hover {
          background-color: #485769;
        }

        .footer-links {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 30px;
          padding: 40px 20px;
        }
        .footer-col h3 {
          color: white;
          font-size: 15px;
          font-weight: 700;
          margin-bottom: 12px;
        }
        .footer-col ul {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .footer-col ul li {
          cursor: pointer;
          color: #ccc;
          transition: color var(--transition-fast);
        }
        .footer-col ul li:hover {
          color: white;
          text-decoration: underline;
        }

        .footer-divider {
          height: 1px;
          background-color: #3a4553;
          width: 100%;
        }

        .footer-bottom {
          padding: 30px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }
        
        .footer-logo-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 30px;
          flex-wrap: wrap;
        }
        .footer-logo {
          cursor: pointer;
          display: flex;
          align-items: baseline;
        }
        .footer-logo .logo-text {
          font-family: 'Outfit', sans-serif;
          font-weight: 700;
          font-size: 20px;
          color: white;
          letter-spacing: -1px;
        }
        .footer-logo .logo-dot {
          font-size: 11px;
          color: var(--amazon-orange);
          font-weight: 600;
          margin-left: 1px;
        }

        .footer-lang-selector {
          display: flex;
          gap: 12px;
          color: #ccc;
        }
        .footer-lang-selector span {
          border: 1px solid #555;
          padding: 6px 12px;
          border-radius: 3px;
          cursor: pointer;
          font-size: 12px;
        }
        .footer-lang-selector span:hover {
          border-color: #ccc;
          color: white;
        }

        .footer-copyright-row {
          text-align: center;
          color: #aaa;
          font-size: 11px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .college-credits {
          color: var(--amazon-orange-light);
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .footer-links {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }
        }
        @media (max-width: 480px) {
          .footer-links {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </footer>
  );
}
