import React, { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";
import "./Favorites.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function Favorites() {
  const { token } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeVideoId, setActiveVideoId] = useState(null);

  const fetchFavorites = async () => {
    try {
      const response = await fetch(`${API_URL}/api/favorites`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setFavorites(data);
      }
    } catch (error) {
      console.error("Error fetching favorites:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchFavorites();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const removeFavorite = async (videoId) => {
    try {
      const response = await fetch(`${API_URL}/api/favorites/${videoId}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (response.ok) {
        setFavorites(favorites.filter(f => f.videoId !== videoId));
        if (activeVideoId === videoId) setActiveVideoId(null);
      }
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  return (
    <section className="favorites-section">
      <div className="section-header">
        <h2>My Sanctuary</h2>
        <p>Your curated collection of spiritual Mezmurs.</p>
      </div>

      {loading ? (
        <div className="loading-spinner">✨ Opening your sanctuary...</div>
      ) : favorites.length === 0 ? (
        <div className="empty-state">
          <p>Your sanctuary is empty. Discover and save your first Mezmur.</p>
          <Link to="/DaySelector" className="btn-primary">Go to Discovery</Link>
        </div>
      ) : (
        <div className="favorites-container">
          <div className="fav-list">
            {favorites.map((fav) => (
              <div key={fav.videoId} className={`fav-item ${activeVideoId === fav.videoId ? 'active' : ''}`}>
                <div className="fav-info" onClick={() => setActiveVideoId(fav.videoId)}>
                  <span className="fav-title">{fav.title}</span>
                  <span className="fav-artist">{fav.artist}</span>
                </div>
                <div className="fav-actions">
                  <button className="play-btn-mini" onClick={() => setActiveVideoId(fav.videoId)}>
                    {activeVideoId === fav.videoId ? 'Playing' : 'Play'}
                  </button>
                  <button className="remove-btn" onClick={() => removeFavorite(fav.videoId)}>✕</button>
                </div>
              </div>
            ))}
          </div>

          <div className="fav-player">
            {activeVideoId ? (
              <div className="video-player-container">
                <iframe
                  width="100%"
                  height="300"
                  src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <button className="close-player" onClick={() => setActiveVideoId(null)}>Close Player</button>
              </div>
            ) : (
              <div className="player-placeholder">
                <p>Select a Mezmur to listen</p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default Favorites;
