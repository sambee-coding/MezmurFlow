import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Logo from "../assets/Logo.png";
import useAuth from "../hooks/useAuth";

function Navbar() {
  const { user, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Hide navbar on sign-in ("/Commune") and sign-up ("/Haven") pages
  if (location.pathname === "/Commune" || location.pathname === "/Haven") {
    return null;
  }

  return (
    <header className="header">
      <nav>
        <div className="Logo">
          <Link to="/">
            <img src={Logo} alt="MezmurFlow Logo" style={{ height: "35px" }} />
          </Link>
        </div>
        <ul>
          <li>
            <Link to="/Home" className="nav-link">Haven</Link>
          </li>
          <li>
            <Link to="/DaySelector" className="nav-link">Discovery</Link>
          </li>
          {isLoggedIn ? (
            <>
              <li className="user-name">☦️ {user.name}</li>
              <li>
                <button onClick={handleLogout} className="logout-btn">Sign Out</button>
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
