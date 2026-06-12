import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useWatchlist } from '../utils/WatchlistContext';
import MovieCard from '../components/MovieCard/MovieCard';
import SkeletonCard from '../components/SkeletonCard/SkeletonCard';
import './Home.css';

const Watchlist = () => {
  const { watchlist, loading } = useWatchlist();
  const [searchTerm, setSearchTerm] = useState('');

  // Filter watchlist locally based on search term
  const filteredWatchlist = searchTerm
    ? watchlist.filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : watchlist;

  return (
    <div className="container section">
      <div className="section-header">
        <h2>My Watchlist</h2>
        <p className="subtitle">{watchlist.length} {watchlist.length === 1 ? 'item' : 'items'} saved</p>
      </div>

      {/* Search within watchlist */}
      {watchlist.length > 0 && (
        <div className="watchlist-search">
          <div className="search-input-wrapper">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search your watchlist..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      )}

      {loading ? (
        <div className="movie-grid">
          {Array(6).fill(0).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : filteredWatchlist.length === 0 ? (
        <div className="no-results" style={{ padding: '4rem 0', textAlign: 'center' }}>
          {searchTerm ? (
            <>
              <h3>No matches found</h3>
              <p>No items in your watchlist match "{searchTerm}"</p>
            </>
          ) : (
            <>
              <h3>Your watchlist is empty</h3>
              <p>Click "Add to Watchlist" on any movie or TV show to save it here.</p>
            </>
          )}
        </div>
      ) : (
        <div className="movie-grid">
          {filteredWatchlist.map(item => (
            <MovieCard 
              key={item.tmdbId || item.id} 
              movie={{
                id: item.tmdbId || item.id,
                title: item.title,
                poster_path: item.posterPath || item.poster_path,
                vote_average: item.voteAverage || item.vote_average,
                release_date: item.releaseDate || item.release_date,
                media_type: item.mediaType || item.media_type || 'movie',
              }} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Watchlist;
