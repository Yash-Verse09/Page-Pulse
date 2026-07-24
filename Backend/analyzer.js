// analyzer.js
// Page Pulse - URL Analyzer
// Fetches a webpage, parses its HTML, and returns a simple audit report.

const axios = require("axios");
const cheerio = require("cheerio");

async function analyzeUrl(url) {
  // Basic URL format check before even trying to fetch it
  try {
    new URL(url);
  } catch (err) {
    throw new Error("Invalid URL format.");
  }

  let response;
  const startTime = Date.now();

  try {
    response = await axios.get(url, {
      timeout: 8000, // fail if the site takes longer than 8 seconds
      headers: {
        // some sites block requests with no user-agent
        "User-Agent": "PagePulse-Bot/1.0",
      },
    });
  } catch (err) {
    if (err.code === "ECONNABORTED") {
      throw new Error("Request timed out while trying to reach the website.");
    }
    if (err.response) {
      // Server responded, but with an error status (404, 500, etc.)
      throw new Error(`Website returned an error status: ${err.response.status}`);
    }
    // No response at all - site doesn't exist / DNS failed / connection refused
    throw new Error("Could not reach the website. Please check the URL.");
  }

  const responseTimeMs = Date.now() - startTime;

  // Make sure we actually got an HTML page to parse
  const contentType = response.headers["content-type"] || "";
  if (!contentType.includes("text/html")) {
    throw new Error("The URL did not return an HTML page.");
  }

  // ----- Parse HTML with cheerio -----
  const $ = cheerio.load(response.data);

  const pageTitle = $("title").first().text().trim() || "No title found";

  const metaDescription =
    $('meta[name="description"]').attr("content")?.trim() || "No meta description found";

  const h1Count = $("h1").length;

  let imagesMissingAlt = 0;
  $("img").each((i, el) => {
    const altText = $(el).attr("alt");
    if (!altText || altText.trim() === "") {
      imagesMissingAlt++;
    }
  });

  // Approximate word count from visible body text
  const bodyText = $("body").text().replace(/\s+/g, " ").trim();
  const wordCount = bodyText.length > 0 ? bodyText.split(" ").length : 0;

  return {
    url,
    httpStatus: response.status,
    responseTimeMs,
    pageTitle,
    metaDescription,
    h1Count,
    imagesMissingAlt,
    wordCount,
  };
}

module.exports = { analyzeUrl };