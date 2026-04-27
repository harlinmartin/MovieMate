import React, { useState, useEffect } from 'react';
import { tmdbService } from '../services/tmdbService';
import MovieCard from '../components/MovieCard/MovieCard';
import SkeletonCard from '../components/SkeletonCard/SkeletonCard';
import './Home.css';

const TVShows = () => {
  const [shows, setShows] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [loading, setLoading] = useState(true);

  // Load genres on mount
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const data = await tmdbService.getGenres('tv');
        setGenres(data);
      } catch (err) {
        console.error("Failed to fetch genres", err);
      }
    };
    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        setLoading(true);
        let data;
        if (selectedGenre) {
          data = await tmdbService.getByGenre('tv', selectedGenre);
        } else {
          data = await tmdbService.getPopular('tv');
        }
        setShows(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchShows();
  }, [selectedGenre]);

  return (
    <div className="container section">
      <div className="section-header">
        <h2>Explore TV Shows</h2>
        
        <div className="filter-container">
          <select 
            value={selectedGenre} 
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="genre-select"
          >
            <option value="">All Genres</option>
            {genres.map(genre => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="movie-grid">
        {loading ? (
          Array(10).fill(0).map((_, i) => <SkeletonCard key={i} />)
        ) : (
          shows.map(show => <MovieCard key={show.id} movie={{...show, media_type: 'tv'}} />)
        )}
      </div>
      
      {shows.length === 0 && !loading && (
        <div className="no-results">
          <h3>No TV shows found for this genre.</h3>
        </div>
      )}
    </div>
  );
};

export default TVShows;
