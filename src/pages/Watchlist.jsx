import React from 'react';
import { useWatchlist } from '../utils/WatchlistContext';
import MovieCard from '../components/MovieCard/MovieCard';
import './Home.css';

const Watchlist = () => {
  const { watchlist } = useWatchlist();

  return (
    <div className="container section">
      <div className="section-header">
        <h2>My Watchlist</h2>
        <p className="subtitle">{watchlist.length} {watchlist.length === 1 ? 'item' : 'items'} saved</p>
      </div>

      {watchlist.length === 0 ? (
        <div className="no-results" style={{ padding: '4rem 0', textAlign: 'center' }}>
          <h3>Your watchlist is empty</h3>
          <p>Click "Add to Watchlist" on any movie or TV show to save it here.</p>
        </div>
      ) : (
        <div className="movie-grid">
          {watchlist.map(item => (
            <MovieCard 
              key={item.id} 
              movie={item} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Watchlist;
