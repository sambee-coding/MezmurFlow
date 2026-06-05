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
    const mezmursArray = data.mezmurs || data.recommended_mezmurs;
    
    if (mezmursArray && Array.isArray(mezmursArray)) {
      // 1. Save the result to a NEW constant
      const enrichedMezmurs = await Promise.all(
        mezmursArray.map(async (m) => {
          const query = `${m.title} ${m.artist} Ethiopian Orthodox Mezmur`;
          console.log("YouTube search query:", query);
          const videoId = await youtubeService.searchYouTube(query);
          console.log("YouTube result for", m.title, ":", videoId || "NO VIDEO FOUND");
          return { ...m, videoId }; 
        })
      );
      
      // 2. Put the enriched array BACK into the data object!
      data.mezmurs = enrichedMezmurs;
      data.recommended_mezmurs = enrichedMezmurs;
    }
    res.json(data);
   }
    catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getMezmurSelection };
