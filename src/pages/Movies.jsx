import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { tmdbService } from '../services/tmdbService';
import MovieCard from '../components/MovieCard/MovieCard';
import SkeletonCard from '../components/SkeletonCard/SkeletonCard';
import './Home.css';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search');

  // Load genres on mount
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const data = await tmdbService.getGenres('movie');
        setGenres(data);
      } catch (err) {
        console.error("Failed to fetch genres", err);
      }
    };
    fetchGenres();
  }, []);

  // Fetch movies when search query or selected genre changes
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        let data;
        
        if (searchQuery) {
          data = await tmdbService.search(searchQuery);
          setSelectedGenre(''); // Clear genre selection when searching
        } else if (selectedGenre) {
          data = await tmdbService.getByGenre('movie', selectedGenre);
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
  }, [searchQuery, selectedGenre]);

  return (
    <div className="container section">
      <div className="section-header">
        <h2>{searchQuery ? `Search Results for "${searchQuery}"` : 'Explore Movies'}</h2>
        
        {/* Simple Genre Filter - Human style */}
        {!searchQuery && (
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
        )}
      </div>
      
      {movies.length === 0 && !loading ? (
        <div className="no-results">
          <h3>No movies found</h3>
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
