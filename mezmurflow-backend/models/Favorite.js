const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    videoId: {
        type: String,
        required: true
    },
    addedAt: {
        type: Date,
        default: Date.now
    }
});

// Prevent duplicate favorites for the same user and video
favoriteSchema.index({ userId: 1, videoId: 1 }, { unique: true });

module.exports = mongoose.model('Favorite', favoriteSchema);
