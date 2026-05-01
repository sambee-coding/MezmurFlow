import React from "react"
import "./Home.css";
import Logo from "../assets/Logo.png"
import Orthodox from "../assets/Orthodox.jpg"
import Fouro4 from '/src/Components/Fouro4.jsx'
import { Link } from "react-router-dom";
import SignIn from "./SignIn";



function Home() {
 

  return (
    
    <section className="hero">
        <header className="header">
            <nav>
                <div className="Logo">
                    <img src={Logo} alt="MezmurFlow-Logo"/>
                </div>
                <ul>
                <li>Haven</li>
               <li><Link to="/Commune" className="Commune-link">Commune</Link></li>

                <li style={{ display: "none" }}>Origin</li>
                <li style={{ display: "none" }}>Communion</li>
                <li style={{ display: "none" }}>Reflection</li>
                </ul>
            </nav>
        </header>

        <section className="hero-content">
            <div className="hero-text">
                <span className="badge">Discover Daily Peace</span>
                <h1>Welcome to <span className="highlight">MezmurFlow</span></h1>
                <p>Find your favorite Mezmur dedicated for each day of the week, curated for your spiritual journey.</p>
                <div className="hero-btns">
                    <Link to="/Commune">
                    <button className="btn-primary">Get Started</button>
                    </Link>
                    <Link to="/Origin">
                    <button className="btn-secondary">Learn More</button>
                    </Link>
                </div>
            </div>
            <div className="hero-card">
                <img src={Orthodox} alt="Orthodox" />
            </div>
        </section>
    </section>
    
  )
}

export default Home
