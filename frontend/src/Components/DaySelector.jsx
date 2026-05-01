import React, { useState, useRef } from "react";
import "./DaySelector.css";

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
  const [selectedDay, setSelectedDay] = useState(null);
  const [ethDate, setEthDate] = useState({ day: "", month: ethiopianMonths[0] });
  const [loading, setLoading] = useState(false);
  const [mezmurData, setMezmurData] = useState(null);
  const [animate, setAnimate] = useState(false);
  
  const resultsRef = useRef(null);
  const fetchMezmurData = async (dayName, month, day) => {
    setLoading(true);
    setMezmurData(null);
    setAnimate(false);

    try {
      // IMPORTANT: Ensure the port here matches your actual backend port!
      let url = `http://localhost:5000/api/mezmur?`;
      if (dayName) url += `day=${dayName}`;
      else url += `month=${month}&ethDay=${day}`;

      const response = await fetch(url);
      const data = await response.json();
      
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

      {mezmurData && (
         <div ref={resultsRef} className={`content-results ${animate ? "show" : ""}`}>
          <div className="result-header">
            <h3>{mezmurData.theme || mezmurData.topic || "Spiritual Content"}</h3>
            <span className="badge">Daily Selection</span>
          </div>

          <div className="results-grid">
            <div className="mezmur-list">
              <h4>Recommended Mezmurs</h4>
              <ul>
                {(mezmurData.mezmurs || mezmurData.recommended_mezmurs || []).map((m, i) => (
                  <li key={i}>
                    <span className="m-title">{m.title}</span>
                    <span className="m-artist">{m.artist}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="story-section">
              <h4>Senkessar Story</h4>
              <p>{mezmurData.story || mezmurData.spiritual_story?.content || "No story available for this date."}</p>
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
