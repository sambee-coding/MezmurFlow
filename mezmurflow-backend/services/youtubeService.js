
const searchYouTube = async (query) => {
    const apiKey = process.env.YOUTUBE_API_KEY;
    if (!apiKey) {
        console.warn("YouTube API Key missing!");
        return null;
    }

    try {
        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&key=${apiKey}&maxResults=1&type=video`;
        const response = await fetch(url);
        
        if (!response.ok) {
            const errorData = await response.json();
            console.error("YouTube API Error:", errorData);
            return null;
        }

        const data = await response.json();

        if (data.items && data.items.length > 0) {
            return data.items[0].id.videoId;
        }
        return null;
    } catch (error) {
        console.error("YouTube search error:", error);
        return null;
    }
};

module.exports = { searchYouTube };
