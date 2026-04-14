import React from 'react';
import { Link } from 'react-router-dom';
import { FiPlay, FiInfo } from 'react-icons/fi';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content container">
          <span className="hero-trending">#1 Trending Today</span>
          <h1 className="hero-title">Discover Your Next Obsession</h1>
          <p className="hero-description">
            Explore thousands of movies and TV shows, from blockbusters to indie gems. 
            Get personalized recommendations and build your ultimate watchlist.
          </p>
          <div className="hero-actions">
            <Link to="/movies" className="btn btn-primary">
              <FiPlay /> Explore Now
            </Link>
            <button className="btn btn-outline">
              <FiInfo /> Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Placeholder for trending movies - Will be populated in Day 3 */}
      <section className="container section">
        <div className="section-header">
          <h2>Trending Movies</h2>
          <Link to="/movies" className="view-all">View All</Link>
        </div>
        <div className="movie-grid-placeholder">
          {/* We will add MovieCards here on Day 2 */}
          <div className="placeholder-text">Cinematic movie grid coming in Day 2...</div>
        </div>
      </section>
    </div>
  );
};

export default Home;
