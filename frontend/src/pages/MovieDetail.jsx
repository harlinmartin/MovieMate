import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiStar, FiCalendar, FiClock, FiPlay, FiArrowLeft, FiPlus, FiCheck } from 'react-icons/fi';
import { tmdbService } from '../services/tmdbService';
import { useWatchlist } from '../utils/WatchlistContext';
import { useAuth } from '../utils/AuthContext';
import api from '../services/api';
import Loader from '../components/Loader/Loader';
import Badge from '../components/Badge/Badge';
import MovieCard from '../components/MovieCard/MovieCard';
import './MovieDetail.css';

const MovieDetail = () => {
  const { type, id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRating, setUserRating] = useState(0);
  const [ratingLoading, setRatingLoading] = useState(false);
  
  const { isInWatchlist, toggleWatchlist } = useWatchlist();
  const { isAuthenticated } = useAuth();

  // Fetch movie details from TMDB
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const data = await tmdbService.getDetails(type, id);
        setMovie(data);
      } catch (err) {
        setError('Failed to fetch details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
    window.scrollTo(0, 0);
  }, [type, id]);

  // Fetch user's rating from our backend (if logged in)
  useEffect(() => {
    const fetchRating = async () => {
      if (!isAuthenticated || !id) return;
      
      try {
        const res = await api.get(`/ratings/${id}`);
        if (res.data.rating !== null) {
          setUserRating(res.data.rating);
        } else {
          setUserRating(0);
        }
      } catch (error) {
        console.error('Error fetching rating:', error);
      }
    };

    fetchRating();
  }, [id, isAuthenticated]);

  // Handle star click — save rating to backend
  const handleRating = async (star) => {
    if (!isAuthenticated) return;

    try {
      setRatingLoading(true);
      setUserRating(star); // Optimistic update

      await api.put('/ratings', {
        tmdbId: Number(id),
        mediaType: type,
        rating: star,
      });
    } catch (error) {
      console.error('Error saving rating:', error);
      setUserRating(0); // Revert on error
    } finally {
      setRatingLoading(false);
    }
  };

  if (loading) return <Loader fullPage />;
  if (error) return <div className="container error-page"><h2>{error}</h2><Link to="/">Go Home</Link></div>;
  if (!movie) return null;

  const backdropUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  const rating = movie.vote_average?.toFixed(1) || '0.0';
  const year = (movie.release_date || movie.first_air_date)?.split('-')[0] || 'N/A';
  const runtime = movie.runtime ? `${movie.runtime} min` : movie.episode_run_time ? `${movie.episode_run_time[0]} min` : 'N/A';
  
  const trailer = movie.videos?.results.find(v => v.type === 'Trailer' && v.site === 'YouTube');
  const isFavorited = isInWatchlist(movie.id);

  const handleToggleWatchlist = () => {
    if (!isAuthenticated) return;
    // This saves the item to our MongoDB watchlist
    toggleWatchlist({
      id: movie.id,
      title: movie.title || movie.name,
      poster_path: movie.poster_path,
      vote_average: movie.vote_average,
      release_date: movie.release_date || movie.first_air_date,
      media_type: type
    });
  };

  return (
    <div className="movie-detail">
      {/* Hero Backdrop */}
      <div className="detail-hero" style={{ backgroundImage: `url(${backdropUrl})` }}>
        <div className="hero-overlay"></div>
        <div className="container hero-container">
          <Link to={-1} className="back-btn"><FiArrowLeft /> Back</Link>
          
          <div className="detail-main">
            <div className="detail-poster animate">
              <img src={posterUrl} alt={movie.title || movie.name} />
            </div>
            
            <div className="detail-info animate">
              <div className="info-badges">
                <Badge variant="accent" icon={FiStar}>{rating} Rating</Badge>
                <Badge variant="glass" icon={FiCalendar}>{year}</Badge>
                <Badge variant="glass" icon={FiClock}>{runtime}</Badge>
              </div>
              
              <h1 className="detail-title">{movie.title || movie.name}</h1>
              {movie.tagline && <p className="detail-tagline">"{movie.tagline}"</p>}
              
              <div className="detail-genres">
                {movie.genres?.map(g => <span key={g.id} className="genre-pill">{g.name}</span>)}
              </div>
              
              <div className="detail-actions">
                {trailer && (
                  <a href={`https://www.youtube.com/watch?v=${trailer.key}`} target="_blank" rel="noreferrer" className="btn btn-primary">
                    <FiPlay /> Watch Trailer
                  </a>
                )}
                {isAuthenticated ? (
                  <button 
                    className={`btn ${isFavorited ? 'btn-success' : 'btn-outline'}`}
                    onClick={handleToggleWatchlist}
                  >
                    {isFavorited ? <><FiCheck /> In Watchlist</> : <><FiPlus /> Add to Watchlist</>}
                  </button>
                ) : (
                  <Link to="/login" className="btn btn-outline">
                    <FiPlus /> Login to Save
                  </Link>
                )}
              </div>

              {/* User rating interface - persisted via backend */}
              <div className="user-rating-section animate">
                {isAuthenticated ? (
                  <>
                    <p>Your Rating:</p>
                    <div className="stars">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FiStar 
                          key={star} 
                          className={star <= userRating ? 'star active' : 'star'} 
                          onClick={() => handleRating(star)}
                          style={{ opacity: ratingLoading ? 0.5 : 1 }}
                        />
                      ))}
                    </div>
                  </>
                ) : (
                  <p className="login-prompt">
                    <Link to="/login">Login</Link> to rate this {type === 'tv' ? 'show' : 'movie'}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container detail-content">
        <section className="detail-section">
          <h3>Overview</h3>
          <p className="detail-description">{movie.overview}</p>
        </section>

        {/* Top Cast */}
        {movie.credits?.cast?.length > 0 && (
          <section className="detail-section">
            <h3>Top Cast</h3>
            <div className="cast-grid">
              {movie.credits.cast.slice(0, 6).map(person => (
                <div key={person.id} className="cast-card">
                  <img 
                    src={person.profile_path ? `https://image.tmdb.org/t/p/w200${person.profile_path}` : 'https://via.placeholder.com/200x300?text=No+Photo'} 
                    alt={person.name} 
                  />
                  <div className="cast-info">
                    <p className="cast-name">{person.name}</p>
                    <p className="cast-character">{person.character}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Similar Content */}
        {movie.similar?.results?.length > 0 && (
          <section className="section">
            <div className="section-header">
              <h3>You May Also Like</h3>
            </div>
            <div className="movie-grid">
              {movie.similar.results.slice(0, 10).map(item => (
                <MovieCard key={item.id} movie={{...item, media_type: type}} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default MovieDetail;
