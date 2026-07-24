// src/pages/Result.jsx
// Page Pulse - Result Page
// UI/UX only - data source (location.state) and navigation are unchanged.

import { useLocation, useNavigate } from "react-router-dom";

// Purely a presentational helper - picks a badge color based on the
// HTTP status range. Does not touch or transform the actual report data.
function getStatusBadgeClass(status) {
  if (status >= 200 && status < 300) return "badge-success";
  if (status >= 300 && status < 400) return "badge-info";
  if (status >= 400 && status < 500) return "badge-warning";
  return "badge-danger";
}

function Result() {
  const location = useLocation();
  const navigate = useNavigate();

  // The report was passed via navigate("/result", { state: { report } })
  const report = location.state?.report;

  // If someone lands here directly (e.g. page refresh) without a report,
  // show a proper empty state instead of a broken page.
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

  return (
    <div className="page">
      <div className="dashboard-header">
        <span className="eyebrow">Audit complete</span>
        <h1>Website Audit Report</h1>
        <p className="audited-url">{report.url}</p>
      </div>

      <div className="report-grid">
        <div className="report-item-card featured-card">
          <span className="report-item-label">HTTP Status</span>
          <span className={`status-badge ${getStatusBadgeClass(report.httpStatus)}`}>
            {report.httpStatus}
          </span>
        </div>

        <div className="report-item-card">
          <span className="report-item-label">Response Time</span>
          <span className="report-item-value mono">{report.responseTimeMs} ms</span>
        </div>

        <div className="report-item-card">
          <span className="report-item-label">H1 Count</span>
          <span className="report-item-value mono">{report.h1Count}</span>
        </div>

        <div className="report-item-card">
          <span className="report-item-label">Images Missing Alt Text</span>
          <span className="report-item-value mono">{report.imagesMissingAlt}</span>
        </div>

        <div className="report-item-card">
          <span className="report-item-label">Word Count</span>
          <span className="report-item-value mono">{report.wordCount}</span>
        </div>

        <div className="report-item-card wide-card">
          <span className="report-item-label">Page Title</span>
          <span className="report-item-value">{report.pageTitle}</span>
        </div>

        <div className="report-item-card wide-card">
          <span className="report-item-label">Meta Description</span>
          <span className="report-item-value">{report.metaDescription}</span>
        </div>
      </div>

      <div className="dashboard-actions">
        <button className="analyze-btn" onClick={() => navigate("/")}>
          Analyze Another Website
        </button>
      </div>

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

export default Result;