import React from 'react';
import { type RecommendationType } from '../types/Movie';
import '../styles/RecommendationTypeSelector.css';

interface Props {
  selectedType: RecommendationType;
  onTypeChange: (type: RecommendationType) => void;
}

const RecommendationTypeSelector: React.FC<Props> = ({ selectedType, onTypeChange }) => {
  return (
    <div className="recommendation-type-selector">
      <h3 className="selector-title">O que você procura?</h3>
      <div className="type-options">
        <button
          type="button"
          className={`type-option ${selectedType === 'single' ? 'active' : ''}`}
          onClick={() => onTypeChange('single')}
        >
          <div className="option-icon">🎲</div>
          <div className="option-content">
            <h4>Um Filme Surpresa</h4>
            <p>Deixe o algoritmo escolher o filme perfeito para você</p>
          </div>
        </button>

        <button
          type="button"
          className={`type-option ${selectedType === 'collection' ? 'active' : ''}`}
          onClick={() => onTypeChange('collection')}
        >
          <div className="option-icon">🍿</div>
          <div className="option-content">
            <h4>Coleção de Filmes</h4>
            <p>Explore várias opções e escolha o que mais te interessar</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default RecommendationTypeSelector;
