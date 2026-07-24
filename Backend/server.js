// server.js
// Page Pulse - Backend Server
// A simple Express API that receives a URL from the frontend,
// runs it through the analyzer, and returns an audit report.

const express = require("express");
const cors = require("cors");
const { analyzeUrl } = require("./analyzer");

const app = express();
const PORT = process.env.PORT || 5000;

// ----- Middleware -----
app.use(cors());          // allow requests from the frontend (different origin)
app.use(express.json());  // parse incoming JSON request bodies

// ----- Routes -----

// Simple health check route
app.get("/", (req, res) => {
  res.send("Page Pulse backend is running.");
});

// Main audit endpoint
app.post("/api/audit", async (req, res) => {
  const { url } = req.body;

  // Validate that a URL was provided
  if (!url) {
    return res.status(400).json({ error: "URL is required in request body." });
  }

  try {
    // Run the analysis (defined in analyzer.js)
    const report = await analyzeUrl(url);
    return res.status(200).json(report);
  } catch (error) {
    // Analyzer failed (bad URL, site unreachable, parsing error, etc.)
    console.error("Audit failed:", error.message);
    return res.status(500).json({
      error: error.message || "Failed to audit the given URL.",
    });
  }
});

// ----- 404 handler for unknown routes -----
app.use((req, res) => {
  res.status(404).json({ error: "Route not found." });
});

// ----- Start server -----
app.listen(PORT, () => {
  console.log(`Page Pulse server running on http://localhost:${PORT}`);
});