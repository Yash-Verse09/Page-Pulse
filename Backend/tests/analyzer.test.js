const { analyzeUrl } = require("../analyzer");

describe("Page Pulse Analyzer", () => {

  test("should analyze a valid webpage", async () => {
    const result = await analyzeUrl("https://example.com");

    expect(result.httpStatus).toBe(200);
    expect(result.pageTitle).toBeTruthy();
    expect(result.wordCount).toBeGreaterThan(0);
  });


  test("should reject invalid URL format", async () => {
    await expect(
      analyzeUrl("hello")
    ).rejects.toThrow("Invalid URL format.");
  });


  test("should handle unreachable website", async () => {
    await expect(
      analyzeUrl("https://thiswebsiteprobablydoesnotexist12345.com")
    ).rejects.toThrow(
      "Could not reach the website. Please check the URL."
    );
  });

});