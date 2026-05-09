const express = require('express');
const router = express.Router();
const Favorite = require('../models/Favorite');
const authMiddleware = require('../middleware/authMiddleware');

// GET /api/favorites - Get all favorites for the current user
router.get('/', authMiddleware, async (req, res) => {
    try {
        const favorites = await Favorite.find({ userId: req.user.userId }).sort({ addedAt: -1 });
        res.json(favorites);
    } catch (err) {
        res.status(500).json({ message: "Error fetching favorites." });
    }
});

// POST /api/favorites - Add a new favorite
router.post('/', authMiddleware, async (req, res) => {
    const { title, artist, videoId } = req.body;
    
    try {
        const newFavorite = new Favorite({
            userId: req.user.userId,
            title,
            artist,
            videoId
        });

        await newFavorite.save();
        res.status(201).json(newFavorite);
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ message: "Mezmur already in favorites!" });
        }
        res.status(500).json({ message: "Error saving favorite." });
    }
});

// DELETE /api/favorites/:videoId - Remove a favorite
router.delete('/:videoId', authMiddleware, async (req, res) => {
    try {
        const result = await Favorite.findOneAndDelete({ 
            userId: req.user.userId, 
            videoId: req.params.videoId 
        });

        if (!result) {
            return res.status(404).json({ message: "Favorite not found." });
        }

        res.json({ message: "Removed from favorites." });
    } catch (err) {
        res.status(500).json({ message: "Error removing favorite." });
    }
});

module.exports = router;
