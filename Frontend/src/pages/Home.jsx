// src/pages/Home.jsx
// Page Pulse - Home Page
// UI/UX only - API call, state and navigation logic are unchanged.

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  return (
    <div className="page">
      {/* ---------- Top Navigation ---------- */}
      <nav className="navbar">
        <span className="navbar-logo">Page Pulse</span>
        <div className="navbar-links">
          <a href="#top">Home</a>
          <a href="#about">About</a>
        </div>
      </nav>

      {/* ---------- Hero Section ---------- */}
      <section className="hero" id="top">
        <div className="hero-glow hero-glow-a"></div>
        <div className="hero-glow hero-glow-b"></div>

        {/* Pulse waveform - the signature visual, ties into "Page Pulse" */}
        <svg className="pulse-line" viewBox="0 0 400 60" preserveAspectRatio="none">
          <polyline
            points="0,30 60,30 80,10 100,50 120,30 180,30 200,5 220,55 240,30 400,30"
          />
        </svg>

        <span className="eyebrow">Instant website diagnostics</span>
        <h1 className="hero-title">
          Analyze Any Website <span className="gradient-text">Instantly</span>
        </h1>
        <p className="hero-subtitle">
          Page Pulse helps you audit website performance, SEO elements and
          accessibility metrics with a simple URL scan.
        </p>

        <div className="search-card">
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

        <p className="hero-support-text">No sign-up required &middot; Results in seconds</p>
      </section>

      {/* ---------- Features / About Section ---------- */}
      <section className="about-section" id="about">
        <h2 className="section-heading">What Page Pulse checks</h2>
        <p className="section-subheading">
          One scan, four categories of insight into any public webpage.
        </p>

        <div className="info-grid">
          <div className="info-card">
            <span className="info-icon">🔍</span>
            <h3>Website Analysis</h3>
            <p>Analyze important website metrics from any URL.</p>
          </div>

          <div className="info-card">
            <span className="info-icon">🎯</span>
            <h3>SEO Insights</h3>
            <p>Check page title, meta description and heading structure.</p>
          </div>

          <div className="info-card">
            <span className="info-icon">♿</span>
            <h3>Accessibility Check</h3>
            <p>Identify images missing alternative text.</p>
          </div>

          <div className="info-card">
            <span className="info-icon">⚡</span>
            <h3>Performance Metrics</h3>
            <p>Measure response time and page information.</p>
          </div>
        </div>
      </section>

      {/* ---------- Technology Section ---------- */}
      <section className="tech-section">
        <h2 className="section-heading">Built With</h2>
        <div className="tech-badges">
          <span className="tech-pill">React</span>
          <span className="tech-pill">Node.js</span>
          <span className="tech-pill">Express.js</span>
          <span className="tech-pill">Axios</span>
          <span className="tech-pill">Cheerio</span>
        </div>
      </section>

      {/* ---------- Footer ---------- */}
      <footer className="footer">
        <p>Built by Yash Gupta</p>
        <p>
          Built for Digital Heroes Training Task —{" "}
          <a href="https://digitalheroesco.com" target="_blank" rel="noopener noreferrer">
            digitalheroesco.com
          </a>
        </p>
      </footer>
    </div>
  );
}

export default Home;