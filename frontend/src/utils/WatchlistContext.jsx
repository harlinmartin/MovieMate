import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import api from '../services/api';
import { useAuth } from './AuthContext';

const WatchlistContext = createContext();

export const WatchlistProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  // Fetch watchlist from backend when user is authenticated
  const fetchWatchlist = useCallback(async () => {
    if (!isAuthenticated) {
      setWatchlist([]);
      return;
    }

    try {
      setLoading(true);
      const res = await api.get('/watchlist');
      setWatchlist(res.data.watchlist);
    } catch (error) {
      console.error('Error fetching watchlist:', error);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  // Reload watchlist when auth state changes
  useEffect(() => {
    fetchWatchlist();
  }, [fetchWatchlist]);

  const addToWatchlist = async (item) => {
    if (!isAuthenticated) return;

    try {
      await api.post('/watchlist', {
        tmdbId: item.id,
        mediaType: item.media_type || 'movie',
        title: item.title || item.name,
        posterPath: item.poster_path,
        voteAverage: item.vote_average,
        releaseDate: item.release_date || item.first_air_date,
      });

      // Refresh the list from backend to stay in sync
      await fetchWatchlist();
    } catch (error) {
      console.error('Error adding to watchlist:', error);
    }
  };

  const removeFromWatchlist = async (tmdbId) => {
    if (!isAuthenticated) return;

    try {
      await api.delete(`/watchlist/${tmdbId}`);
      // Remove from local state immediately for snappy UI
      setWatchlist(prev => prev.filter(item => item.tmdbId !== tmdbId));
    } catch (error) {
      console.error('Error removing from watchlist:', error);
    }
  };

  const isInWatchlist = (id) => {
    return watchlist.some(item => item.tmdbId === id);
  };

  const toggleWatchlist = async (item) => {
    if (isInWatchlist(item.id)) {
      await removeFromWatchlist(item.id);
    } else {
      await addToWatchlist(item);
    }
  };

  return (
    <WatchlistContext.Provider value={{ watchlist, loading, addToWatchlist, removeFromWatchlist, isInWatchlist, toggleWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  );
};

export const useWatchlist = () => {
  const context = useContext(WatchlistContext);
  if (!context) {
    throw new Error('useWatchlist must be used within a WatchlistProvider');
  }
  return context;
};
