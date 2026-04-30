const geminiService = require("../services/geminiService");

const getMezmurSelection = async (req, res) => {
  const { day, month, ethDay } = req.query;

  if (!day && !month) {
    return res.status(400).json({ error: "Please provide a day or a date." });
  }

  try {
    const data = await geminiService.getDailySpiritualContent(day, month, ethDay);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getMezmurSelection };
