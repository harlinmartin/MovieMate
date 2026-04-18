import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { tmdbService } from '../services/tmdbService';
import MovieCard from '../components/MovieCard/MovieCard';
import SkeletonCard from '../components/SkeletonCard/SkeletonCard';
import './Home.css';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        let data;
        if (searchQuery) {
          data = await tmdbService.search(searchQuery);
        } else {
          data = await tmdbService.getPopular('movie');
        }
        setMovies(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [searchQuery]);

  return (
    <div className="container section">
      <div className="section-header">
        <h2>{searchQuery ? `Search Results for "${searchQuery}"` : 'Explore Movies'}</h2>
      </div>
      
      {movies.length === 0 && !loading ? (
        <div className="no-results">
          <h3>No movies found for "{searchQuery}"</h3>
        </div>
      ) : (
        <div className="movie-grid">
          {loading ? (
            Array(10).fill(0).map((_, i) => <SkeletonCard key={i} />)
          ) : (
            movies.map(movie => (
              <MovieCard 
                key={movie.id} 
                movie={{...movie, media_type: movie.media_type || 'movie'}} 
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Movies;
