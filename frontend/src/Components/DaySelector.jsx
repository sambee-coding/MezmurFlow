import React, { useState } from "react";
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


  function getFinalSelectedDay(selectedDay, ethDate, days) {
    // 1. CLICK has priority
    if (selectedDay !== null && selectedDay !== undefined) {
      return days.find(day => day.id === selectedDay);
    }

    // 2. SEARCH fallback
    if (ethDate.day && ethDate.month) {
      return {
        id: null,
        name: `${ethDate.month} ${ethDate.day}`,
        theme: "Search Result"
      };
    }

    return null;
  }

  const finalDay = getFinalSelectedDay(selectedDay, ethDate, days);

  const handleSearchChange = (updates) => {
    setSelectedDay(null); // Clear card selection when searching
    setEthDate({ ...ethDate, ...updates });
  };

  const handleCardClick = (id) => {
    setSelectedDay(id);
    setEthDate({ day: "", month: ethiopianMonths[0] }); // Clear search when clicking card
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
            onChange={(e) => handleSearchChange({ month: e.target.value })}
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
            onChange={(e) => handleSearchChange({ day: e.target.value })}
            className="day-input"
          />
          <button className="search-btn">Search Mezmur</button>
        </div>
      </div>

      {finalDay && (
        <div className="selection-result">
          <span className="selection-badge">Showing results for: <strong>{finalDay.name}</strong></span>
          {finalDay.theme && <p className="selection-theme">Theme: {finalDay.theme}</p>}
        </div>
      )}

      <div className="separator-text">
        <span>OR CHOOSE BY DAY</span>
      </div>

      <div className="days-grid">
        {days.map((day) => (
          <div 
            key={day.id} 
            className={`day-card ${selectedDay === day.id ? "active" : ""}`}
            onClick={() => handleCardClick(day.id)}
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
    </section>
  );
}

export default DaySelector;
