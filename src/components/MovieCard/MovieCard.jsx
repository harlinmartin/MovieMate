import React from 'react';
import { Link } from 'react-router-dom';
import { FiStar, FiCalendar, FiPlay } from 'react-icons/fi';
import Badge from '../Badge/Badge';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
  const { id, title, poster_path, vote_average, release_date, first_air_date } = movie;
  
  const rating = vote_average?.toFixed(1) || '0.0';
  const year = (release_date || first_air_date)?.split('-')[0] || 'N/A';
  const imageUrl = poster_path 
    ? `https://image.tmdb.org/t/p/w500${poster_path}` 
    : 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=2070&auto=format&fit=crop';

  const mediaType = movie.media_type || (movie.title ? 'movie' : 'tv');

  return (
    <Link to={`/${mediaType}/${id}`} className="movie-card">
      <div className="card-poster">
        <img src={imageUrl} alt={title} loading="lazy" />
        <div className="card-overlay">
          <div className="card-play-btn">
            <FiPlay />
          </div>
        </div>
        <div className="card-badges">
          <Badge variant="accent" icon={FiStar}>{rating}</Badge>
        </div>
      </div>
      <div className="card-info">
        <h3 className="card-title" title={title}>{title}</h3>
        <div className="card-meta">
          <span className="card-year">
            <FiCalendar /> {year}
          </span>
          <span className="card-type">{movie.media_type === 'tv' ? 'TV Show' : 'Movie'}</span>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
