import React, { useState, useEffect } from 'react';
import { MovieService } from '../services/movieService';
import '../styles/MovieDetailsModal.css';

interface MovieDetails {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  release_date: string;
  runtime: number;
  vote_average: number;
  vote_count: number;
  genres: { id: number; name: string }[];
  production_countries: { iso_3166_1: string; name: string }[];
  spoken_languages: { iso_639_1: string; name: string }[];
  budget: number;
  revenue: number;
  tagline: string;
  homepage: string;
}

interface Props {
  movieId: number;
  onClose: () => void;
}

const MovieDetailsModal: React.FC<Props> = ({ movieId, onClose }) => {
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const details = await MovieService.getMovieDetails(movieId);
        setMovieDetails(details);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar detalhes');
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}min`;
  };

  const formatMoney = (amount: number) => {
    if (amount === 0) return 'N/A';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (loading) {
    return (
      <div className="modal-backdrop" onClick={handleBackdropClick}>
        <div className="modal-content loading-modal">
          <div className="loading-spinner">
            <div className="spinner-ring"></div>
            <div className="spinner-ring"></div>
            <div className="spinner-ring"></div>
          </div>
          <p>Carregando detalhes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="modal-backdrop" onClick={handleBackdropClick}>
        <div className="modal-content error-modal">
          <h3>Erro ao carregar detalhes</h3>
          <p>{error}</p>
          <button onClick={onClose} className="btn btn-primary">
            Fechar
          </button>
        </div>
      </div>
    );
  }

  if (!movieDetails) return null;

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content movie-details-modal">
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>

        <div className="modal-header">
          <div
            className="backdrop-image"
            style={{
              backgroundImage: `url(${MovieService.buildImageUrl(movieDetails.backdrop_path, 'w1280')})`
            }}
          >
            <div className="backdrop-overlay">
              <div className="header-content">
                <img
                  src={MovieService.buildImageUrl(movieDetails.poster_path, 'w300')}
                  alt={movieDetails.title}
                  className="modal-poster"
                />
                <div className="title-section">
                  <h2 className="modal-title">{movieDetails.title}</h2>
                  {movieDetails.tagline && (
                    <p className="modal-tagline">"{movieDetails.tagline}"</p>
                  )}
                  <div className="quick-info">
                    <span className="rating">
                      ★ {movieDetails.vote_average.toFixed(1)}
                    </span>
                    <span className="runtime">
                      ⏱️ {formatRuntime(movieDetails.runtime)}
                    </span>
                    <span className="release-year">
                      📅 {new Date(movieDetails.release_date).getFullYear()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-body">
          <div className="details-grid">
            <div className="details-main">
              <section className="overview-section">
                <h3>📖 Sinopse</h3>
                <p>{movieDetails.overview}</p>
              </section>

              <section className="genres-section">
                <h3>🎭 Gêneros</h3>
                <div className="genres-list">
                  {movieDetails.genres.map(genre => (
                    <span key={genre.id} className="genre-tag">
                      {genre.name}
                    </span>
                  ))}
                </div>
              </section>
            </div>

            <div className="details-sidebar">
              <section className="stats-section">
                <h3>📊 Estatísticas</h3>
                <div className="stat-item">
                  <span className="stat-label">Avaliações TMDB:</span>
                  <span className="stat-value">{movieDetails.vote_count.toLocaleString()}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Orçamento:</span>
                  <span className="stat-value">{formatMoney(movieDetails.budget)}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Arrecadação:</span>
                  <span className="stat-value">{formatMoney(movieDetails.revenue)}</span>
                </div>
              </section>

              <section className="languages-section">
                <h3>🗣️ Idiomas</h3>
                <div className="languages-list">
                  {movieDetails.spoken_languages.map(lang => (
                    <span key={lang.iso_639_1} className="language-item">
                      {lang.name}
                    </span>
                  ))}
                </div>
              </section>

              <section className="countries-section">
                <h3>🌍 Países</h3>
                <div className="countries-list">
                  {movieDetails.production_countries.map(country => (
                    <span key={country.iso_3166_1} className="country-item">
                      {country.name}
                    </span>
                  ))}
                </div>
              </section>
            </div>
          </div>

          {movieDetails.homepage && (
            <div className="modal-actions">
              <a
                href={movieDetails.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                🌐 Site Oficial
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsModal;
