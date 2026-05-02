import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Logo from "../assets/Logo.png";

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if a user is saved in localStorage
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, [location]); // Re-check every time the page changes

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  // Do not show the Navbar on the Sign In or Sign Up pages
  if (location.pathname === "/Commune" || location.pathname === "/Haven") {
    return null;
  }

  return (
    <header className="header">
      <nav>
        <div className="Logo">
          <Link to="/"><img src={Logo} alt="MezmurFlow Logo" style={{ height: "35px" }} /></Link>
        </div>
        <ul>
          <li><Link to="/Home" className="nav-link">Haven</Link></li>
          <li><Link to="/DaySelector" className="nav-link">Discovery</Link></li>
          
          {user ? (
            <>
              <li className="user-name">☦️ {user.name}</li>
              <li>
                <button onClick={handleLogout} className="logout-btn">
                    Sign Out
                </button>
              </li>
            </>
          ) : (
            <li>
                <Link to="/Commune" className="Commune-link">Commune</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
