import React, { useState } from 'react';
import { type MovieFilters, type RecommendationType, type Movie, type MovieRecommendationsResponse } from '../types/Movie';
import { MovieService } from '../services/movieService';
import RecommendationTypeSelector from './RecommendationTypeSelector';
import FilterSection from './FilterSection';
import MovieResults from './MovieResults';
import Pagination from './Pagination';
import '../styles/MovieRecommendationForm.css';

const MovieRecommendationForm: React.FC = () => {
  const [filters, setFilters] = useState<MovieFilters>({});
  const [recommendationType, setRecommendationType] = useState<RecommendationType>('collection');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [singleMovie, setSingleMovie] = useState<Movie | null>(null);
  const [movieCollection, setMovieCollection] = useState<MovieRecommendationsResponse | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    await fetchMovies(1);
  };

  const fetchMovies = async (page: number = 1) => {
    setLoading(true);
    setError(null);
    if (recommendationType === 'single') {
      setSingleMovie(null);
      setMovieCollection(null);
    }

    try {
      if (recommendationType === 'single') {
        const movie = await MovieService.getRandomRecommendation(filters);
        setSingleMovie(movie);
        setMovieCollection(null);
      } else {
        const filtersWithPage = { ...filters, page };
        const collection = await MovieService.getRecommendations(filtersWithPage);
        setMovieCollection(collection);
        setSingleMovie(null);
        setCurrentPage(page);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao buscar recomendações');
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    fetchMovies(page);
  };

  const handleReset = () => {
    setFilters({});
    setRecommendationType('collection');
    setSingleMovie(null);
    setMovieCollection(null);
    setError(null);
    setCurrentPage(1);
  };

  return (
    <div className="recommendation-form-container">
      <form onSubmit={handleSubmit} className="recommendation-form">
        <div className="form-header">
          <h2 className="form-title">🎬 Encontre Seu Próximo Filme</h2>
          <p className="form-subtitle">
            Personalize sua busca com os filtros abaixo ou deixe em branco para descobrir algo novo
          </p>
        </div>

        <RecommendationTypeSelector
          selectedType={recommendationType}
          onTypeChange={setRecommendationType}
        />

        <FilterSection
          filters={filters}
          onFiltersChange={setFilters}
        />

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner"></span>
                Buscando...
              </>
            ) : (
              <>
                🎯 {recommendationType === 'single' ? 'Encontrar Um Filme' : 'Ver Coleção'}
              </>
            )}
          </button>

          <button type="button" onClick={handleReset} className="btn btn-secondary">
            🔄 Limpar Filtros
          </button>
        </div>
      </form>

      {error && <div className="error">{error}</div>}

      <MovieResults
        singleMovie={singleMovie}
        movieCollection={movieCollection}
        loading={loading}
      />

      {movieCollection && movieCollection.total_pages > 1 && !loading && (
        <Pagination
          currentPage={currentPage}
          totalPages={movieCollection.total_pages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default MovieRecommendationForm;
