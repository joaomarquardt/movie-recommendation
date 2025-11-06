import React from 'react';
import { type MovieFilters } from '../types/Movie';
import '../styles/FilterSection.css';

interface Props {
  filters: MovieFilters;
  onFiltersChange: (filters: MovieFilters) => void;
}

const GENRES = [
  { id: 28, name: 'Ação' },
  { id: 12, name: 'Aventura' },
  { id: 16, name: 'Animação' },
  { id: 35, name: 'Comédia' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentário' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Família' },
  { id: 14, name: 'Fantasia' },
  { id: 36, name: 'História' },
  { id: 27, name: 'Terror' },
  { id: 10402, name: 'Música' },
  { id: 9648, name: 'Mistério' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Ficção Científica' },
  { id: 10770, name: 'TV' },
  { id: 53, name: 'Thriller' },
  { id: 10752, name: 'Guerra' },
  { id: 37, name: 'Faroeste' }
];

const DECADES = [
  { value: 2020, label: '2020s' },
  { value: 2010, label: '2010s' },
  { value: 2000, label: '2000s' },
  { value: 1990, label: '1990s' },
  { value: 1980, label: '1980s' },
  { value: 1970, label: '1970s' },
  { value: 1960, label: '1960s' }
];

const MOODS = [
  { value: 'happy', label: '😊 Animado' },
  { value: 'adventurous', label: '🤠 Aventureiro' },
  { value: 'history', label: '🌎 Historiador' },
  { value: 'relaxing', label: '😌 Relaxante' },
  { value: 'romantic', label: '💕 Romântico' },
  { value: 'spooky', label: '😱 Assustador' }
];

const LANGUAGES = [
  { value: 'en', label: 'Inglês' },
  { value: 'pt', label: 'Português' },
  { value: 'es', label: 'Espanhol' },
  { value: 'fr', label: 'Francês' },
  { value: 'de', label: 'Alemão' },
  { value: 'it', label: 'Italiano' },
  { value: 'ja', label: 'Japonês' },
  { value: 'ko', label: 'Coreano' }
];

const FilterSection: React.FC<Props> = ({ filters, onFiltersChange }) => {
  const updateFilter = (key: keyof MovieFilters, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const toggleGenre = (genreId: number) => {
    const currentGenres = filters.genreIds || [];
    const newGenres = currentGenres.includes(genreId)
      ? currentGenres.filter(id => id !== genreId)
      : [...currentGenres, genreId];

    updateFilter('genreIds', newGenres.length > 0 ? newGenres : undefined);
  };

  return (
    <div className="filter-section">
      <h3 className="filter-title">Personalize sua Busca</h3>

      <div className="filter-group">
        <label className="filter-label">Gêneros Favoritos</label>
        <div className="genre-grid">
          {GENRES.map(genre => (
            <button
              key={genre.id}
              type="button"
              className={`genre-chip ${filters.genreIds?.includes(genre.id) ? 'active' : ''}`}
              onClick={() => toggleGenre(genre.id)}
            >
              {genre.name}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-row">
        <div className="filter-group">
          <label className="filter-label">Década</label>
          <select
            value={filters.decade || ''}
            onChange={(e) => updateFilter('decade', e.target.value ? parseInt(e.target.value) : undefined)}
            className="filter-select"
          >
            <option value="">Qualquer época</option>
            {DECADES.map(decade => (
              <option key={decade.value} value={decade.value}>
                {decade.label}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-label">Humor do Momento</label>
          <select
            value={filters.mood || ''}
            onChange={(e) => updateFilter('mood', e.target.value || undefined)}
            className="filter-select"
          >
            <option value="">Como você está se sentindo?</option>
            {MOODS.map(mood => (
              <option key={mood.value} value={mood.value}>
                {mood.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="filter-row">
        <div className="filter-group">
          <label className="filter-label">Idioma Original</label>
          <select
            value={filters.withOriginalLanguage || ''}
            onChange={(e) => updateFilter('withOriginalLanguage', e.target.value || undefined)}
            className="filter-select"
          >
            <option value="">Qualquer idioma</option>
            {LANGUAGES.map(lang => (
              <option key={lang.value} value={lang.value}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-label">País de Origem</label>
          <input
            type="text"
            value={filters.withOriginCountry || ''}
            onChange={(e) => updateFilter('withOriginCountry', e.target.value || undefined)}
            placeholder="Ex: US, BR, FR..."
            className="filter-input"
          />
        </div>
      </div>

      <div className="filter-row">
        <div className="filter-group">
          <label className="filter-label">Duração Mínima (min)</label>
          <input
            type="number"
            value={filters.withRuntimeGte || ''}
            onChange={(e) => updateFilter('withRuntimeGte', e.target.value ? parseInt(e.target.value) : undefined)}
            placeholder="Ex: 90"
            className="filter-input"
            min="1"
            max="300"
          />
        </div>

        <div className="filter-group">
          <label className="filter-label">Duração Máxima (min)</label>
          <input
            type="number"
            value={filters.withRuntimeLte || ''}
            onChange={(e) => updateFilter('withRuntimeLte', e.target.value ? parseInt(e.target.value) : undefined)}
            placeholder="Ex: 180"
            className="filter-input"
            min="1"
            max="300"
          />
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
