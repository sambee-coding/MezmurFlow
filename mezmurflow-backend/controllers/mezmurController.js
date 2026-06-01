// mezmurflow-backend/controllers/mezmurController.js
const grokService = require("../services/grokService");
const youtubeService = require("../services/youtubeService"); // 1. Import the new service

const getMezmurSelection = async (req, res) => {
  const { day, month, ethDay } = req.query;

  if (!day && !month) {
    return res.status(400).json({ error: "Please provide a day or a date." });
  }

  try {
    // 2. Get the spiritual content from Grok
    const data = await grokService.getDailySpiritualContent(day, month, ethDay);

    // 3. ENRICHMENT: Add YouTube IDs to each mezmur
    // We use Promise.all to search for all of them in parallel (faster!)
    if (data.mezmurs && Array.isArray(data.mezmurs)) {
      data.mezmurs = await Promise.all(
        data.mezmurs.map(async (m) => {
          const query = `${m.title} ${m.artist} Mezmur`;
          const videoId = await youtubeService.searchYouTube(query);
          return { ...m, videoId }; // Return the mezmur with the new videoId
        })
      );
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getMezmurSelection };
