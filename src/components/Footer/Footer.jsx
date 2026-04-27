import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-info">
          <h3 className="footer-logo">Movie<span>Mate</span></h3>
          <p>Your personal companion for discovering the best movies and TV shows.</p>
        </div>
        
        <div className="footer-links">
          <div className="footer-column">
            <h4>Explore</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/movies">Movies</Link></li>
              <li><Link to="/tv">TV Shows</Link></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h4>Personal</h4>
            <ul>
              <li><Link to="/watchlist">My Watchlist</Link></li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {currentYear} MovieMate. Built with ❤️ for the Mini Project.</p>
        </div>
      </div>
    </footer>
  );
};

// Simple helper to avoid import errors since Link is from react-router-dom
import { Link } from 'react-router-dom';

export default Footer;
