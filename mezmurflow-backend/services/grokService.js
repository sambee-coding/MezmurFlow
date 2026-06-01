const dotenv = require("dotenv");
dotenv.config();

const getDailySpiritualContent = async (day, ethMonth, ethDay) => {
  const apiKey = process.env.GROQ_API_KEY;

  const url = "https://api.groq.com/openai/v1/chat/completions";

  console.log("Calling Groq API for date:", { day, ethMonth, ethDay });

  const prompt = `
    You are an expert hagiographer and hymnologist of the Ethiopian Orthodox Tewahedo Church.
    Based on the following date/day:
    Day of Week: ${day || "N/A"}
    Ethiopian Month: ${ethMonth || "N/A"}
    Ethiopian Day: ${ethDay || "N/A"}

    TASK:
    1. Identify the primary spiritual theme or saint commemorated on this day in the Ethiopian Orthodox Tewahedo Church.
    2. Recommend 3-5 REAL and well-known Ethiopian Orthodox Tewahedo Mezmurs (hymns) that match this theme.
       - ONLY recommend mezmurs from the Ethiopian Orthodox Tewahedo tradition.
       - DO NOT recommend Protestant, Evangelical, or any non-Orthodox songs.
       - Use REAL artist names from the Ethiopian Orthodox tradition such as: Zemari Tewodros Yosef, Zemari Diaqon Daniel Kibret, Zemari Yilma Hailu, Mezmur Dawit, Diaqon Zelalem, Diaqon Tewodros, Zemari Muluken Abebe, or other well-known Orthodox mezmur singers.
       - Provide the mezmur title in transliterated Amharic (e.g., "Tewodros Yosef - Egziabher Yibarek") for better searchability.
    3. Provide a concise summary of the "Senkessar" (Synaxarium) story for this specific date.
    4. Provide a spiritual reflection or related Bible verse from the Orthodox canon.

    CRITICAL: YOU MUST RETURN ONLY A JSON OBJECT. NO MARKDOWN. NO EXTRA TEXT.
    JSON SCHEMA:
    {
      "theme": "Title of the day/theme",
      "mezmurs": [
        { "title": "Mezmur Title in transliterated Amharic", "artist": "Real Orthodox artist name" }
      ],
      "story": "A detailed but concise spiritual story or Senkessar entry",
      "reflection": "A spiritual reflection or verse"
    }
  `;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Groq API Response Error:", data);
      throw new Error(data.error?.message || "Groq API Error");
    }

    const text = data.choices[0].message.content;
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("AI response was not valid JSON");

    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error("--- GROQ API ERROR ---");
    console.error(error.message);
    throw error;
  }
};

module.exports = { getDailySpiritualContent };
