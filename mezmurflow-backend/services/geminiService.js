const dotenv = require("dotenv");
dotenv.config();

const getDailySpiritualContent = async (day, ethMonth, ethDay) => {
  const apiKey = process.env.GEMINI_API_KEY;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  console.log("Calling Gemini API for date:", { day, ethMonth, ethDay });

  const prompt = `
    You are an expert hagiographer and hymnologist of the Ethiopian Orthodox Tewahedo Church.
    Based on the following date/day:
    Day of Week: ${day || "N/A"}
    Ethiopian Month: ${ethMonth || "N/A"}
    Ethiopian Day: ${ethDay || "N/A"}

    TASK:
    1. Identify the primary spiritual theme or saint commemorated on this day.
    2. Recommend 3-5 authentic Ethiopian Orthodox Mezmurs that match this theme.
    3. Provide a concise summary of the "Senkessar" (Synaxarium) story for this specific date.
    4. Provide a spiritual reflection or related Bible verse.

    CRITICAL: YOU MUST RETURN ONLY A JSON OBJECT. NO MARKDOWN. NO EXTRA TEXT.
    JSON SCHEMA:
    {
      "theme": "Title of the day/theme",
      "mezmurs": [
        { "title": "Mezmur Title in English or transliterated Amharic", "artist": "Artist name" }
      ],
      "story": "A detailed but concise spiritual story or Senkessar entry",
      "reflection": "A spiritual reflection or verse"
    }
  `;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("API Response Error:", data);
      throw new Error(data.error?.message || "API Error");
    }

    const text = data.candidates[0].content.parts[0].text;
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("AI response was not valid JSON");
    
    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error("--- DIRECT API ERROR ---");
    console.error(error.message);
    throw error;
  }
};

module.exports = { getDailySpiritualContent };
