// src/components/Footer.jsx
// Page Pulse - Shared Footer
// Used by both Home.jsx and Result.jsx so the footer stays identical
// across pages. Purely presentational - no API calls, no state that
// affects the rest of the app.
//
// NOTE: Update the GitHub/LinkedIn hrefs below with your real profile
// URLs before shipping - they're placeholders for now.

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-top">
        {/* ---------- Brand ---------- */}
        <div className="footer-brand">
          <span className="footer-logo">Page Pulse</span>
          <p className="footer-tagline">
            A website auditing platform that analyzes performance, SEO,
            accessibility and technical health from a single URL scan.
          </p>
        </div>

        {/* ---------- Product Links ---------- */}
        <div className="footer-column">
          <h4>Product</h4>
          <ul>
            <li>
              <a href="/#features">Features</a>
            </li>
            <li>
              <a href="/#how-it-works">How It Works</a>
            </li>
            <li>
              <a href="/#report-preview">Reports</a>
            </li>
            <li>
              <a href="/">Analyze Website</a>
            </li>
          </ul>
        </div>

        {/* ---------- Resources ---------- */}
        <div className="footer-column">
          <h4>Resources</h4>
          <ul>
            <li>
              <a href="#">Documentation</a>
            </li>
            <li>
              <a href="#">Support</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
        </div>

        {/* ---------- Developer ---------- */}
        <div className="footer-column">
          <h4>Developer</h4>
          <p className="footer-developer-name">Built by Yash Gupta</p>
          <div className="footer-social">
            <a href="https://github.com/Yash-Verse09" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/yash-gupta-364190346/" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      {/* ---------- Bottom bar ---------- */}
      <div className="footer-bottom">
        <p>&copy; {year} Page Pulse. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;