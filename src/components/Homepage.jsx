import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// components/HomePage.jsx
function HomePage() {
    return (
      <div className="home-page">
        <section className="hero">
          <div className="container">
            <div className="hero-content">
              <h1>Welcome to SmartVend</h1>
              <p className="tagline">The next generation of vending machine technology</p>
              <p className="description">
                Experience seamless purchasing with our state-of-the-art digital vending solution.
                No more fumbling for change or dealing with stuck products!
              </p>
              <Link to="/vending" className="btn-primary">Try the Vending Machine</Link>
            </div>
            <div className="hero-image">
              <img src="/api/placeholder/500/400" alt="SmartVend App Interface" />
            </div>
          </div>
        </section>
  
        <section className="features">
          <div className="container">
            <h2 className="section-title">Key Features</h2>
            <div className="feature-grid">
              
              <div className="feature-card">
                <div className="feature-icon">🔍</div>
                <h3>Product Preview</h3>
                <p>Detailed information about each product before purchase</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🔔</div>
                <h3>Stock Alerts</h3>
                <p>Real-time inventory tracking and notifications</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🎯</div>
                <h3>Personalized Experience</h3>
                <p>Remember preferences and suggest favorites</p>
              </div>
            </div>
          </div>
        </section>
  
        <section className="app-showcase">
          <div className="container">
            <h2 className="section-title">The SmartVend Experience</h2>
            <div className="showcase-content">
              <div className="showcase-text">
                <p>Our digital vending machine combines intuitive design with powerful technology to create a seamless purchasing experience.</p>
                <p>With SmartVend, you can browse products, view nutritional information, and make purchases with just a few taps.</p>
                <Link to="/vending" className="btn-secondary">Experience It Now</Link>
              </div>
              <div className="showcase-image">
                <img src="/api/placeholder/500/300" alt="SmartVend Demo" />
              </div>
            </div>
          </div>
        </section>
        
        <section className="team-preview">
          <div className="container">
            <h2 className="section-title">Meet Our Team</h2>
            <p className="team-intro">Our talented team of developers and designers worked tirelessly to bring SmartVend to life.</p>
            <Link to="/team" className="btn-secondary">Learn More About Our Team</Link>
          </div>
        </section>
      </div>
    );
  }
  
  export default HomePage;