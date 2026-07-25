const { analyzeUrl } = require("../lib/analyzer");

module.exports = async (req, res) => {

  // Only POST allowed
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  const { url } = req.body;

  // URL validation
  if (!url) {
    return res.status(400).json({
      error: "URL is required"
    });
  }

  try {

    const report = await analyzeUrl(url);

    return res.status(200).json(report);

  } catch (error) {

    console.error("Audit Error:", error.message);

    return res.status(500).json({
      error: error.message || "Failed to audit URL"
    });

  }
};