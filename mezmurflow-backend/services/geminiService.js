const dotenv = require("dotenv");
dotenv.config();

const getDailySpiritualContent = async (day, ethMonth, ethDay) => {
  const apiKey = process.env.GEMINI_API_KEY;
 const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-lite-latest:generateContent?key=${apiKey}`;


  console.log("Directly calling Gemini API...");

  const prompt = `
    You are an expert in Ethiopian Orthodox Tewahedo Church spiritual content. 
    Context: Day of Week: ${day || "Not specified"}, Ethiopian Month: ${ethMonth || "Not specified"}, Ethiopian Day: ${ethDay || "Not specified"}

    Provide:
    1. 3-5 recommended Mezmurs (JSON array of {title, artist}).
    2. A short spiritual story (Senkessar).
    3. A reflection or verse.

    RESPONSE MUST BE VALID JSON ONLY:
    {
      "mezmurs": [{ "title": "...", "artist": "..." }],
      "story": "...",
      "reflection": "...",
      "theme": "..."
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
