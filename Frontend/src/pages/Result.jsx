// src/pages/Result.jsx
// Page Pulse - Result Page (Analytics Dashboard)
// UI/UX only - the report still comes from location.state exactly as
// before. Everything below (scores, badges, chart, recommendations) is
// computed on the frontend FROM the existing 8 fields the backend already
// returns (url, httpStatus, responseTimeMs, pageTitle, metaDescription,
// h1Count, imagesMissingAlt, wordCount) - no new backend fields are assumed.

import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

// ---------- Presentational scoring helpers (frontend-only, derived) ----------

function getPerformanceScore(responseTimeMs) {
  if (responseTimeMs <= 200) return 95;
  if (responseTimeMs <= 500) return 85;
  if (responseTimeMs <= 1000) return 70;
  if (responseTimeMs <= 2000) return 55;
  return 35;
}

function getSeoScore({ pageTitle, metaDescription, h1Count }) {
  let score = 100;
  if (!pageTitle || pageTitle === "No title found") score -= 30;
  if (!metaDescription || metaDescription === "No meta description found") score -= 30;
  if (h1Count === 0) score -= 20;
  else if (h1Count > 1) score -= 10;
  return Math.max(score, 0);
}

function getAccessibilityScore(imagesMissingAlt) {
  if (imagesMissingAlt === 0) return 100;
  if (imagesMissingAlt <= 2) return 80;
  if (imagesMissingAlt <= 5) return 60;
  return 40;
}

function getTechnicalHealthScore(httpStatus, responseTimeMs) {
  let score = 100;
  if (httpStatus >= 500) score = 20;
  else if (httpStatus >= 400) score = 50;
  else if (httpStatus >= 300) score = 80;
  if (responseTimeMs > 1500) score -= 15;
  return Math.max(score, 0);
}

function getStatus(score) {
  if (score >= 85) return { label: "Good", className: "pill-good" };
  if (score >= 60) return { label: "Warning", className: "pill-warning" };
  return { label: "Needs Improvement", className: "pill-critical" };
}

function getHttpStatusText(status) {
  const known = { 200: "OK", 301: "Moved Permanently", 302: "Found", 404: "Not Found", 500: "Server Error" };
  return known[status] ? `${status} ${known[status]}` : `${status}`;
}

function getSpeedLabel(responseTimeMs) {
  if (responseTimeMs <= 300) return { label: "Fast", className: "pill-good" };
  if (responseTimeMs <= 800) return { label: "Moderate", className: "pill-warning" };
  return { label: "Slow", className: "pill-critical" };
}

function buildRecommendations(report) {
  const items = [];

  if (!report.pageTitle || report.pageTitle === "No title found") {
    items.push({
      type: "warning",
      severity: "High",
      title: "Missing page title",
      description: "Search engines and visitors won't see a title for this page.",
    });
  }
  if (!report.metaDescription || report.metaDescription === "No meta description found") {
    items.push({
      type: "warning",
      severity: "Medium",
      title: "Missing meta description",
      description: "A meta description improves click-through rate from search results.",
    });
  }
  if (report.h1Count === 0) {
    items.push({
      type: "warning",
      severity: "Medium",
      title: "No H1 heading found",
      description: "Every page should have exactly one H1 to define its main topic.",
    });
  } else if (report.h1Count > 1) {
    items.push({
      type: "warning",
      severity: "Low",
      title: "Multiple H1 headings found",
      description: "Using more than one H1 can confuse search engines about page structure.",
    });
  }
  if (report.imagesMissingAlt > 0) {
    items.push({
      type: "warning",
      severity: report.imagesMissingAlt > 5 ? "High" : "Medium",
      title: `${report.imagesMissingAlt} image${report.imagesMissingAlt > 1 ? "s" : ""} missing alt text`,
      description: "Alt text helps screen readers and improves accessibility compliance.",
    });
  }
  if (report.responseTimeMs > 1000) {
    items.push({
      type: "warning",
      severity: report.responseTimeMs > 2000 ? "High" : "Medium",
      title: "Slow server response time",
      description: "A faster response improves user experience and search ranking.",
    });
  }
  if (report.httpStatus >= 400) {
    items.push({
      type: "warning",
      severity: "High",
      title: "Page returned an error status",
      description: `The server responded with ${getHttpStatusText(report.httpStatus)}.`,
    });
  }

  if (items.length === 0) {
    items.push({
      type: "success",
      severity: "Good",
      title: "Website status is healthy",
      description: "No major issues were found in this scan.",
    });
  }

  return items;
}

function Result() {
  const location = useLocation();
  const navigate = useNavigate();

  const report = location.state?.report;

  if (!report) {
    return (
      <div className="page">
        <div className="empty-state">
          <span className="empty-icon">📭</span>
          <h2>No audit report found. Go back and analyze a website.</h2>
          <button className="analyze-btn" onClick={() => navigate("/")}>
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const performanceScore = getPerformanceScore(report.responseTimeMs);
  const seoScore = getSeoScore(report);
  const accessibilityScore = getAccessibilityScore(report.imagesMissingAlt);
  const technicalScore = getTechnicalHealthScore(report.httpStatus, report.responseTimeMs);

  const healthScore = Math.round(
    (performanceScore + seoScore + accessibilityScore + technicalScore) / 4
  );

  const healthLabel =
    healthScore >= 90
      ? "Excellent Website Health"
      : healthScore >= 75
      ? "Good Website Health"
      : healthScore >= 50
      ? "Website Needs Improvement"
      : "Poor Website Health";

  const speed = getSpeedLabel(report.responseTimeMs);
  const recommendations = buildRecommendations(report);

  const summaryCards = [
    {
      key: "performance",
      icon: "⚡",
      title: "Performance",
      score: performanceScore,
      description: "Based on server response time.",
    },
    {
      key: "seo",
      icon: "🎯",
      title: "SEO Score",
      score: seoScore,
      description: "Title, meta description and heading checks.",
    },
    {
      key: "accessibility",
      icon: "♿",
      title: "Accessibility",
      score: accessibilityScore,
      description: "Images missing alternative text.",
    },
    {
      key: "technical",
      icon: "🛡️",
      title: "Technical Health",
      score: technicalScore,
      description: "HTTP status and response reliability.",
    },
  ];

  return (
    <div className="page">
      {/* ---------- Header Section ---------- */}
      <div className="dashboard-header">
        <span className="completed-badge">✓ Audit Completed</span>
        <p className="audited-url">{report.url}</p>

        <div className="score-hero">
          <div
            className="score-ring-large"
            style={{ "--score-percent": `${healthScore}%` }}
          >
            <div className="score-ring-inner">
              <span className="score-number-large">{healthScore}</span>
              <span className="score-number-suffix">/100</span>
            </div>
          </div>
          <p className="score-caption">{healthLabel}</p>
          <span className={`status-pill ${getStatus(healthScore).className}`}>
            {getStatus(healthScore).label}
          </span>
        </div>
      </div>

      {/* ---------- Summary Cards ---------- */}
      <section className="dashboard-section">
        <div className="summary-grid">
          {summaryCards.map((card) => (
            <div className="summary-card" key={card.key}>
              <div className="summary-card-top">
                <span className="summary-icon">{card.icon}</span>
                <span className="summary-score">{card.score}%</span>
              </div>
              <h3>{card.title}</h3>
              <div className="bar-track">
                <div className="bar-fill" style={{ width: `${card.score}%` }}></div>
              </div>
              <div className="summary-card-bottom">
                <p>{card.description}</p>
                <span className={`status-dot ${getStatus(card.score).className}`}></span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Website Overview ---------- */}
      <section className="dashboard-section">
        <h2 className="dash-section-heading">Website Overview</h2>
        <div className="overview-stat-grid">
          <div className="overview-stat-card">
            <span className="overview-stat-icon">🌐</span>
            <span className="overview-stat-label">HTTP Status</span>
            <span className="overview-stat-value">{getHttpStatusText(report.httpStatus)}</span>
          </div>
          <div className="overview-stat-card">
            <span className="overview-stat-icon">⏱️</span>
            <span className="overview-stat-label">Response Time</span>
            <span className="overview-stat-value mono">{report.responseTimeMs}ms</span>
          </div>
          <div className="overview-stat-card">
            <span className="overview-stat-icon">📝</span>
            <span className="overview-stat-label">Word Count</span>
            <span className="overview-stat-value mono">{report.wordCount}</span>
          </div>
          <div className="overview-stat-card">
            <span className="overview-stat-icon">🖼️</span>
            <span className="overview-stat-label">Images Analysis</span>
            <span className="overview-stat-value">{report.imagesMissingAlt} missing alt</span>
          </div>
          <div className="overview-stat-card overview-stat-wide">
            <span className="overview-stat-icon">🏷️</span>
            <span className="overview-stat-label">Page Title</span>
            <span className="overview-stat-value">{report.pageTitle}</span>
          </div>
        </div>
      </section>

      {/* ---------- SEO Analysis ---------- */}
      <section className="dashboard-section">
        <h2 className="dash-section-heading">SEO Analysis</h2>
        <div className="detail-grid">
          <div className="detail-card">
            <span className="detail-label">Title Status</span>
            {report.pageTitle && report.pageTitle !== "No title found" ? (
              <span className="status-pill pill-good">✓ Title found</span>
            ) : (
              <span className="status-pill pill-critical">✕ Missing</span>
            )}
          </div>
          <div className="detail-card">
            <span className="detail-label">Meta Description</span>
            {report.metaDescription &&
            report.metaDescription !== "No meta description found" ? (
              <span className="status-pill pill-good">✓ Present</span>
            ) : (
              <span className="status-pill pill-critical">✕ Missing</span>
            )}
          </div>
          <div className="detail-card">
            <span className="detail-label">Heading Structure</span>
            <span className="detail-value mono">H1 Count: {report.h1Count}</span>
          </div>
        </div>
      </section>

      {/* ---------- Accessibility ---------- */}
      <section className="dashboard-section">
        <h2 className="dash-section-heading">Accessibility</h2>
        <div className="detail-grid">
          <div className="detail-card">
            <span className="detail-label">Images Missing Alt Text</span>
            <span className={`detail-value-large mono ${report.imagesMissingAlt > 0 ? "text-warning" : "text-success"}`}>
              {report.imagesMissingAlt}
            </span>
          </div>
          <div className="detail-card">
            <span className="detail-label">Accessibility Status</span>
            <span className={`status-pill ${getStatus(accessibilityScore).className}`}>
              {getStatus(accessibilityScore).label}
            </span>
          </div>
        </div>
      </section>

      {/* ---------- Performance ---------- */}
      <section className="dashboard-section">
        <h2 className="dash-section-heading">Performance</h2>
        <div className="performance-panel glass">
          <div className="performance-top">
            <div>
              <span className="detail-label">Response Time</span>
              <p className="performance-value mono">{report.responseTimeMs}ms</p>
            </div>
            <span className={`status-pill ${speed.className}`}>{speed.label}</span>
          </div>

          <div className="speed-track">
            <div className="speed-zone speed-fast"></div>
            <div className="speed-zone speed-moderate"></div>
            <div className="speed-zone speed-slow"></div>
            <div
              className="speed-marker"
              style={{
                left: `${Math.min((report.responseTimeMs / 2000) * 100, 100)}%`,
              }}
            ></div>
          </div>
          <div className="speed-legend">
            <span>0ms</span>
            <span>800ms</span>
            <span>2000ms+</span>
          </div>

          <div className="performance-bottom">
            <span className="detail-label">Speed Score</span>
            <span className="summary-score">{performanceScore}%</span>
          </div>
        </div>
      </section>

      {/* ---------- Issues & Recommendations ---------- */}
      <section className="dashboard-section">
        <h2 className="dash-section-heading">Things To Improve</h2>
        <div className="recommendations-panel">
          {recommendations.map((item) => (
            <div className={`recommendation-row rec-${item.type}`} key={item.title}>
              <span className="rec-icon">{item.type === "success" ? "✓" : "⚠"}</span>
              <div className="rec-body">
                <div className="rec-heading-row">
                  <span className="rec-title">{item.title}</span>
                  <span className={`rec-severity sev-${item.severity.toLowerCase()}`}>
                    {item.severity}
                  </span>
                </div>
                <p className="rec-description">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Action Button ---------- */}
      <div className="dashboard-actions">
        <button className="analyze-btn premium-analyze-btn" onClick={() => navigate("/")}>
          Analyze Another Website
        </button>
      </div>

      <Footer />
    </div>
  );
}

export default Result;