
const sleep = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const generateDestinationDescription = async (req, res) => {
  try {
    // 1. Get destination details from the request
    const { name, location, category } = req.body;

    // 2. Validate the input
    if (
      typeof name !== "string" ||
      typeof location !== "string" ||
      typeof category !== "string" ||
      !name.trim() ||
      !location.trim() ||
      !category.trim()
    ) {
      return res.status(400).json({
        message:
          "Destination name, location, and category are required.",
      });
    }

    // 3. Check whether the Gemini API key is configured
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.error("GEMINI_API_KEY is missing.");

      return res.status(500).json({
        message: "AI service is not configured on the server.",
      });
    }

    // 4. Create the prompt
    const prompt = `
Write an engaging, factual tourism description for this destination.

Destination: ${name.trim()}
Location: ${location.trim()}
Category: ${category.trim()}

Requirements:
- Write 2 to 4 sentences.
- Use clear, visitor-friendly language.
- Avoid inventing specific facts, prices, opening hours, or statistics.
- Return only the description, without a heading or quotation marks.
`;

    // 5. Call Gemini with retry handling
    let result;
    let lastError = "";

    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        console.log(`Gemini request attempt ${attempt}/3`);

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${encodeURIComponent(apiKey)}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              contents: [
                {
                  parts: [{ text: prompt }],
                },
              ],
              generationConfig: {
                temperature: 0.7,
              },
            }),
            signal: AbortSignal.timeout(30000),
          }
        );

        result = await response.json().catch(() => ({}));

        // Success: stop retrying
        if (response.ok) {
          break;
        }

        lastError =
          result.error?.message || `HTTP ${response.status}`;

        console.error(
          `Gemini API error on attempt ${attempt}:`,
          response.status,
          lastError
        );

        // Retry rate limits and temporary server errors only
        const temporaryError =
          response.status === 429 || response.status >= 500;

        if (!temporaryError || attempt === 3) {
          return res.status(502).json({
            message: temporaryError
              ? "AI service is temporarily busy. Please try again shortly."
              : "AI could not generate a description. Please check the server configuration.",
          });
        }
      } catch (error) {
        lastError = error.message;

        console.error(
          `Gemini request failed on attempt ${attempt}:`,
          lastError
        );

        if (attempt === 3) {
          return res.status(502).json({
            message:
              "AI service is temporarily unavailable. Please try again.",
          });
        }
      }

      // Wait before retrying: 1.5 seconds, then 3 seconds
      await sleep(attempt * 1500);
    }

    // 6. Extract the generated description
    const description = result?.candidates?.[0]?.content?.parts
      ?.map((part) => part.text || "")
      .join("")
      .trim();

    if (!description) {
      console.error(
        "Gemini returned no description.",
        lastError
      );

      return res.status(502).json({
        message:
          "AI returned an empty description. Please try again.",
      });
    }

    // 7. Return the result to the frontend
    return res.status(200).json({ description });
  } catch (error) {
    console.error(
      "Description generation failed:",
      error.message
    );

    return res.status(500).json({
      message: "Failed to generate the destination description.",
    });
  }
};

module.exports = { generateDestinationDescription };
