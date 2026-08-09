// src/pages/Home.jsx
// Page Pulse - Home Page
// UI/UX only - the audit API call, state, and navigation logic are unchanged.
// New sections below (How It Works, Report Preview, Why Choose, FAQ) are
// purely presentational and do not affect the audit flow.

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../components/Footer";

const FAQ_ITEMS = [
  {
    question: "What does Page Pulse analyze?",
    answer:
      "Page Pulse checks performance signals like response time, SEO basics like page title and meta description, heading structure, and accessibility issues like images missing alt text.",
  },
  {
    question: "How fast is the report generated?",
    answer:
      "Most scans complete in just a few seconds, depending on how quickly the target website responds.",
  },
  {
    question: "Do I need an account?",
    answer:
      "No. Page Pulse works instantly with no sign-up, no login, and no data stored on your behalf.",
  },
];

function Home() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [openFaq, setOpenFaq] = useState(null); // presentational only - FAQ accordion

  const navigate = useNavigate();

  const handleAnalyze = async () => {
    setError("");

    if (!url.trim()) {
      setError("Please enter a URL before analyzing.");
      return;
    }

    setLoading(true);

    try {
      // Existing backend API - unchanged
      const response = await axios.post("http://localhost:5000/api/audit", {
        url: url.trim(),
      });

      // Send the report to the Result page via route state
      navigate("/result", { state: { report: response.data } });
    } catch (err) {
      const backendMessage = err.response?.data?.error;
      setError(backendMessage || "Something went wrong while analyzing the URL.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAnalyze();
    }
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="page">
      {/* ---------- Sticky Navbar ---------- */}
      <nav className="navbar">
        <span className="navbar-logo">Page Pulse</span>
        <div className="navbar-links">
          <a href="#top">Home</a>
          <a href="#features">Features</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#report-preview">Report</a>
        </div>
        <a href="#top" className="navbar-cta">
          Analyze Now
        </a>
      </nav>

      {/* ---------- Hero Section ---------- */}
      <section className="hero" id="top">
        <div className="hero-glow hero-glow-a"></div>
        <div className="hero-glow hero-glow-b"></div>
        <div className="hero-glow hero-glow-c"></div>

        <span className="badge-pill fade-in">⚡ Instant Website Diagnostics</span>

        <h1 className="hero-title fade-in">
          Find Hidden Problems
          <br />
          <span className="gradient-text">Before Your Users Do</span>
        </h1>

        <p className="hero-subtitle fade-in">
          Analyze website performance, SEO, accessibility and technical issues
          with a simple URL scan.
        </p>

        <div className="search-card glass-card fade-in">
          <div className="input-section">
            <input
              type="text"
              className="url-input"
              placeholder="Enter a website URL, e.g. https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button className="analyze-btn" onClick={handleAnalyze} disabled={loading}>
              {loading ? "Analyzing..." : "Analyze"}
            </button>
          </div>

          {loading && (
            <p className="status-text loading-text">Fetching and analyzing the page...</p>
          )}
          {error && <p className="status-text error-text">{error}</p>}
        </div>

        <p className="hero-support-text fade-in">
          No signup required • Results in seconds
        </p>
      </section>

      {/* ---------- How It Works ---------- */}
      <section className="how-section" id="how-it-works">
        <h2 className="section-heading">How It Works</h2>
        <p className="section-subheading">Three steps between you and a full audit.</p>

        <div className="steps-grid">
          <div className="step-card">
            <span className="step-number">1</span>
            <h3>Enter Website URL</h3>
            <p>Paste any public website link into the scanner.</p>
          </div>

          <div className="step-card">
            <span className="step-number">2</span>
            <h3>Website Analysis</h3>
            <p>Page Pulse scans performance, SEO and accessibility signals.</p>
          </div>

          <div className="step-card">
            <span className="step-number">3</span>
            <h3>Get Detailed Report</h3>
            <p>Receive a clear, actionable breakdown in seconds.</p>
          </div>
        </div>
      </section>

      {/* ---------- Feature Section ---------- */}
      <section className="about-section" id="features">
        <h2 className="section-heading">Everything You Need to Diagnose a Website</h2>
        <p className="section-subheading">
          Four focus areas, one scan.
        </p>

        <div className="info-grid">
          <div className="feature-card-wrap">
            <div className="info-card">
              <span className="info-icon">⚙️</span>
              <h3>Performance Analysis</h3>
              <ul className="feature-list">
                <li>Response time</li>
                <li>Loading issues</li>
                <li>Website speed</li>
              </ul>
            </div>
          </div>

          <div className="feature-card-wrap">
            <div className="info-card">
              <span className="info-icon">🎯</span>
              <h3>SEO Intelligence</h3>
              <ul className="feature-list">
                <li>Meta tags</li>
                <li>Heading structure</li>
                <li>Search optimization</li>
              </ul>
            </div>
          </div>

          <div className="feature-card-wrap">
            <div className="info-card">
              <span className="info-icon">♿</span>
              <h3>Accessibility Audit</h3>
              <ul className="feature-list">
                <li>Missing alt text</li>
                <li>Accessibility problems</li>
              </ul>
            </div>
          </div>

          <div className="feature-card-wrap">
            <div className="info-card">
              <span className="info-icon">💯</span>
              <h3>Website Health Score</h3>
              <ul className="feature-list">
                <li>Overall website quality</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Report Preview Section ---------- */}
      <section className="report-preview-section" id="report-preview">
        <h2 className="section-heading">See What You'll Get</h2>
        <p className="section-subheading">A clean, visual breakdown of every scan.</p>

        <div className="preview-card glass-card">
          <div className="preview-score">
            <span className="preview-score-label">Website Health Score</span>
            <span className="preview-score-value">87/100</span>
          </div>

          <div className="preview-bar-row">
            <div className="preview-bar-label">
              <span>Performance</span>
              <span>90%</span>
            </div>
            <div className="preview-bar-track">
              <div className="preview-bar-fill" style={{ width: "90%" }}></div>
            </div>
          </div>

          <div className="preview-bar-row">
            <div className="preview-bar-label">
              <span>SEO</span>
              <span>85%</span>
            </div>
            <div className="preview-bar-track">
              <div className="preview-bar-fill" style={{ width: "85%" }}></div>
            </div>
          </div>

          <div className="preview-bar-row">
            <div className="preview-bar-label">
              <span>Accessibility</span>
              <span>92%</span>
            </div>
            <div className="preview-bar-track">
              <div className="preview-bar-fill" style={{ width: "92%" }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Why Choose Page Pulse ---------- */}
      <section className="why-section">
        <h2 className="section-heading">Why Choose Page Pulse</h2>

        <div className="why-grid">
          <div className="why-item">
            <span className="why-icon">🚀</span>
            <div>
              <h3>Fast Analysis</h3>
              <p>Get results in seconds, not minutes.</p>
            </div>
          </div>

          <div className="why-item">
            <span className="why-icon">📋</span>
            <div>
              <h3>Simple Reports</h3>
              <p>No clutter — just the metrics that matter.</p>
            </div>
          </div>

          <div className="why-item">
            <span className="why-icon">💡</span>
            <div>
              <h3>Actionable Insights</h3>
              <p>Know exactly what to fix next.</p>
            </div>
          </div>

          <div className="why-item">
            <span className="why-icon">🔓</span>
            <div>
              <h3>No Signup Required</h3>
              <p>Scan any URL instantly, no account needed.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- FAQ Section ---------- */}
      <section className="faq-section">
        <h2 className="section-heading">Frequently Asked Questions</h2>

        <div className="faq-list">
          {FAQ_ITEMS.map((item, index) => (
            <div
              className={`faq-item ${openFaq === index ? "faq-open" : ""}`}
              key={item.question}
            >
              <button className="faq-question" onClick={() => toggleFaq(index)}>
                {item.question}
                <span className="faq-toggle-icon">{openFaq === index ? "−" : "+"}</span>
              </button>
              {openFaq === index && <p className="faq-answer">{item.answer}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Footer ---------- */}
      <Footer />
    </div>
  );
}

export default Home;