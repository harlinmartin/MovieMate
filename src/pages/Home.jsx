import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiPlay, FiInfo } from 'react-icons/fi';
import MovieCard from '../components/MovieCard/MovieCard';
import SkeletonCard from '../components/SkeletonCard/SkeletonCard';
import { tmdbService } from '../services/tmdbService';
import './Home.css';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        setLoading(true);
        const data = await tmdbService.getTrending();
        setMovies(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch trending movies. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, []);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content container">
          <span className="hero-trending animate">#1 Trending Today</span>
          <h1 className="hero-title animate">Discover Your Next Obsession</h1>
          <p className="hero-description animate">
            Explore thousands of movies and TV shows, from blockbusters to indie gems. 
            Get personalized recommendations and build your ultimate watchlist.
          </p>
          <div className="hero-actions animate">
            <Link to="/movies" className="btn btn-primary">
              <FiPlay /> Explore Now
            </Link>
            <button className="btn btn-outline">
              <FiInfo /> Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Dynamic Grid Section */}
      <section className="container section">
        <div className="section-header">
          <h2>Trending Movies</h2>
          <Link to="/movies" className="view-all">View All</Link>
        </div>
        
        <div className="movie-grid">
          {loading ? (
            Array(10).fill(0).map((_, i) => <SkeletonCard key={i} />)
          ) : error ? (
            <div className="error-message">{error}</div>
          ) : (
            movies.map(movie => <MovieCard key={movie.id} movie={movie} />)
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
