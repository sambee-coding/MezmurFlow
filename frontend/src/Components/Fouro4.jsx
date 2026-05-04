import React from "react";
import { Link} from "react-router-dom";
import './Fouro4.css'
function Fouro4() {
  return (
    <div className="four04-container">
      <div className="four04-card">
        <div className="error-code">404</div>
        <h1 className="error-title">Page Not Found</h1>
        <p className="error-message">
          The page you are looking for does not exist.
        </p>
        <Link to="/" className="home-link">
          <button className="home-button">Return to Haven</button>
        </Link>
      </div>
    </div>
  );
}

export default  Fouro4;