import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import "./DaySelector.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const ethiopianMonths = [
  "Meskerem", "Tikimt", "Hidar", "Tahsas", "Tir", "Yakatit", 
  "Magabit", "Miyazya", "Ginbot", "Sane", "Hamle", "Nahase", "Pagume"
];

const days = [
  { id: 1, name: "Monday", amharic: "ሰኞ", theme: "Repentance" },
  { id: 2, name: "Tuesday", amharic: "ማክሰኞ", theme: "Mercy" },
  { id: 3, name: "Wednesday", amharic: "ረቡዕ", theme: "Prayer" },
  { id: 4, name: "Thursday", amharic: "ሐሙስ", theme: "Praise" },
  { id: 5, name: "Friday", amharic: "ዓርብ", theme: "The Cross" },
  { id: 6, name: "Saturday", amharic: "ቅዳሜ", theme: "Peace" },
  { id: 7, name: "Sunday", amharic: "እሁድ", theme: "Resurrection" },
];

function DaySelector() {

  const { token, isLoggedIn, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState(null);
  const [ethDate, setEthDate] = useState({ day: "", month: ethiopianMonths[0] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mezmurData, setMezmurData] = useState(null);
  const [animate, setAnimate] = useState(false);
  const [activeVideoId, setActiveVideoId] = useState(null);
  const [favorites, setFavorites] = useState([]);

  // Protection logic: Redirect to Sign In if not logged in
  useEffect(() => {
    if (!authLoading) {
      if (!token) {
        navigate("/Commune");
      } else {
        fetchFavorites();
      }
    }
  }, [token, navigate, authLoading]);

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
    }
  };

  const toggleFavorite = async (mezmur) => {
    const isFav = favorites.some(f => f.videoId === mezmur.videoId);
    
    try {
      if (isFav) {
        await fetch(`${API_URL}/api/favorites/${mezmur.videoId}`, {
          method: "DELETE",
          headers: { "Authorization": `Bearer ${token}` }
        });
        setFavorites(favorites.filter(f => f.videoId !== mezmur.videoId));
      } else {
        const response = await fetch(`${API_URL}/api/favorites`, {
          method: "POST",
          headers: { 
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            title: mezmur.title,
            artist: mezmur.artist,
            videoId: mezmur.videoId
          })
        });
        if (response.ok) {
          const newFav = await response.json();
          setFavorites([...favorites, newFav]);
        }
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };
  
  const resultsRef = useRef(null);

  const fetchMezmurData = async (dayName, month, day) => {
    setLoading(true);
    setMezmurData(null);
    setAnimate(false);
    setActiveVideoId(null);
    setError(null);

    try {
      let url = `${API_URL}/api/mezmur?`;
      if (dayName) url += `day=${dayName}`;
      else url += `month=${month}&ethDay=${day}`;

      const response = await fetch(url, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      const data = await response.json();
      
      if (!response.ok) {
        const errorMsg = data.error || data.message;
        if (response.status === 400 && errorMsg === "Invalid token.") {
            throw new Error("Your login session has expired. Please sign out and sign in again.");
        }
        throw new Error(errorMsg || `HTTP error ${response.status}`);
      }

      if (data && typeof data === 'object') {
        setMezmurData(data);
        // Trigger animation after DOM has rendered the new data
        setTimeout(() => {
          setAnimate(true);
          // Smooth scroll to the results
          if (resultsRef.current) {
            resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 50);
      } else {
        throw new Error("Invalid data format");
      }
    } catch (error) {
      console.error("Error fetching mezmur:", error);
      setError(error.message || "Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchClick = () => {
    if (ethDate.day) {
      fetchMezmurData(null, ethDate.month, ethDate.day);
    }
  };

  const handleCardClick = (day) => {
    setSelectedDay(day.id);
    setEthDate({ day: "", month: ethiopianMonths[0] });
    fetchMezmurData(day.name);
  };

  return (
    <section className="day-selector-section">
      <div className="section-header">
        <h2>Find by Date</h2>
        <p>Select a date from the Ethiopian Calendar to discover its Mezmur.</p>
      </div>

      <div className="date-search-container">
        <div className="search-bar">
          <select 
            value={ethDate.month} 
            onChange={(e) => setEthDate({ ...ethDate, month: e.target.value })}
            className="month-picker"
          >
            {ethiopianMonths.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
          <input 
            type="number" 
            placeholder="Day" 
            min="1" 
            max="30"
            value={ethDate.day}
            onChange={(e) => setEthDate({ ...ethDate, day: e.target.value })}
            className="day-input"
          />
          <button className="search-btn" onClick={handleSearchClick}>Search Mezmur</button>
        </div>
      </div>

      <div className="separator-text">
        <span>OR CHOOSE BY DAY</span>
      </div>

      <div className="days-grid">
        {days.map((day) => (
          <div 
            key={day.id} 
            className={`day-card ${selectedDay === day.id ? "active" : ""}`}
            onClick={() => handleCardClick(day)}
          >
            <div className="day-name">
              <h3>{day.name}</h3>
              <span className="amharic-label">{day.amharic}</span>
            </div>
            <p className="day-theme">{day.theme}</p>
            <div className="arrow-icon">→</div>
          </div>
        ))}
      </div>

      {loading && <div className="loading-spinner">✨ Finding spiritual treasures...</div>}
      
      {error && (
        <div className="error-message" style={{ color: '#c0392b', textAlign: 'center', margin: '2rem 0', padding: '1rem', background: '#fadbd8', borderRadius: '10px' }}>
          <h4>Error Fetching Data</h4>
          <p>{error}</p>
        </div>
      )}

      {mezmurData && (
  <div ref={resultsRef} className={`content-results ${animate ? "show" : ""}`}>
    <div className="result-header">
      {/* 1. This should be the theme title */}
      <h3>{mezmurData.theme || "Daily Selection"}</h3>
      <span className="badge">Daily Selection</span>
    </div>

    <div className="results-grid">
      <div className="mezmur-list">
        <h4>Recommended Mezmurs</h4>
        {/* 2. The list starts here */}
        <ul>
          {(mezmurData.mezmurs || mezmurData.recommended_mezmurs || []).map((m, i) => (
            <li key={i} className="mezmur-item">
              <div className="m-info">
                <span className="m-title">{m.title}</span>
                <span className="m-artist">{m.artist}</span>
              </div>
              
              {/* 3. The Play button */}
              <div className="m-actions">
                {m.videoId && (
                  <button 
                    onClick={() => setActiveVideoId(m.videoId)}
                    className={`play-btn ${activeVideoId === m.videoId ? 'playing' : ''}`}
                  >
                    {activeVideoId === m.videoId ? 'Playing...' : '▶ Play'}
                  </button>
                )}
                <button 
                  className={`fav-btn ${favorites.some(f => f.videoId === m.videoId) ? 'active' : ''}`}
                  onClick={() => toggleFavorite(m)}
                >
                  {favorites.some(f => f.videoId === m.videoId) ? '❤️' : '🤍'}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="story-section">
        {activeVideoId ? (
          <div className="video-player-container">
            <iframe
              width="100%"
              height="250"
              src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <button className="close-player" onClick={() => setActiveVideoId(null)}>Close Player</button>
          </div>
        ) : (
          <>
            <h4>Senkessar Story</h4>
            <p>{mezmurData.story || "No story available for this date."}</p>
          </>
        )}
      </div>
    </div>

    <div className="reflection-footer">
      <h4>Daily Reflection</h4>
      <p>"{mezmurData.reflection || "May the blessings of this day be with you."}"</p>
    </div>
  </div>
)}
    </section>
  );
}

export default DaySelector;
