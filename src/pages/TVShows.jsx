import React, { useState, useEffect } from 'react';
import { tmdbService } from '../services/tmdbService';
import MovieCard from '../components/MovieCard/MovieCard';
import SkeletonCard from '../components/SkeletonCard/SkeletonCard';
import './Home.css';

const TVShows = () => {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const data = await tmdbService.getPopular('tv');
        setShows(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchShows();
  }, []);

  return (
    <div className="container section">
      <div className="section-header">
        <h2>Explore TV Shows</h2>
      </div>
      <div className="movie-grid">
        {loading ? (
          Array(10).fill(0).map((_, i) => <SkeletonCard key={i} />)
        ) : (
          shows.map(show => <MovieCard key={show.id} movie={{...show, media_type: 'tv'}} />)
        )}
      </div>
    </div>
  );
};

export default TVShows;
