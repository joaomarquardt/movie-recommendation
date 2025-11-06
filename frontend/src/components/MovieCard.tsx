import React, { useState } from 'react';
import { type Movie } from '../types/Movie';
import { MovieService } from '../services/movieService';
import MovieDetailsModal from './MovieDetailsModal';
import '../styles/MovieCard.css';

interface Props {
  movie: Movie;
  featured?: boolean;
}

const MovieCard: React.FC<Props> = ({ movie, featured = false }) => {
  const [showDetails, setShowDetails] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'short'
    });
  };

  const formatRating = (rating: number) => {
    return rating.toFixed(1);
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 8) return 'var(--gold-accent)';
    if (rating >= 7) return '#4ade80';
    if (rating >= 6) return '#fbbf24';
    return '#f87171';
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const handleViewDetails = () => {
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
  };

  return (
    <>
      <div className={`movie-card ${featured ? 'featured-highlight' : ''}`}>
        <div className="movie-poster">
          <img
            src={MovieService.buildImageUrl(movie.poster_path)}
            alt={movie.title}
            loading="lazy"
          />
          <div className="movie-rating">
            <span
              className="rating-value"
              style={{ color: getRatingColor(movie.vote_average) }}
            >
              ★ {formatRating(movie.vote_average)}
            </span>
          </div>
          {featured && (
            <div className="featured-badge">
              🎲 Surpresa!
            </div>
          )}
        </div>

        <div className="movie-info">
          <h3 className="movie-title" title={movie.title}>
            {truncateText(movie.title, 35)}
          </h3>

          <div className="movie-meta">
            <span className="release-date">
              📅 {formatDate(movie.release_date)}
            </span>
            <span className="vote-count">
              👥 {movie.vote_count.toLocaleString()}
            </span>
          </div>

          <p className="movie-overview" title={movie.overview}>
            {truncateText(movie.overview, 120)}
          </p>

          <div className="movie-language">
            <span className="language-tag">
              🗣️ {movie.original_language.toUpperCase()}
            </span>
          </div>
        </div>

        <div className="movie-actions">
          <button
            className="btn-action btn-primary"
            onClick={handleViewDetails}
          >
            🎬 Ver Detalhes
          </button>
        </div>
      </div>

      {showDetails && (
        <MovieDetailsModal
          movieId={movie.id}
          onClose={handleCloseDetails}
        />
      )}
    </>
  );
};

export default MovieCard;
