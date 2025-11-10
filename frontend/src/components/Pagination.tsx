import React from 'react';
import '../styles/Pagination.css';

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number;
}

const Pagination: React.FC<Props> = ({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 7
}) => {
  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    pages.push(1);

    const leftSiblingIndex = Math.max(currentPage - 1, 2);
    const rightSiblingIndex = Math.min(currentPage + 1, totalPages - 1);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      for (let i = 2; i <= 5; i++) {
        pages.push(i);
      }
      pages.push('...');
      pages.push(totalPages);
      return pages;
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      pages.push('...');
      for (let i = totalPages - 4; i < totalPages; i++) {
        pages.push(i);
      }
      pages.push(totalPages);
      return pages;
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      pages.push('...');
      for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
        pages.push(i);
      }
      pages.push('...');
      pages.push(totalPages);
      return pages;
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="pagination-container">
      <div className="pagination-info">
        <span>
          Página <strong>{currentPage}</strong> de <strong>{totalPages}</strong>
        </span>
      </div>

      <div className="pagination">
        <button
          className="pagination-btn pagination-arrow"
          onClick={handlePrevious}
          disabled={currentPage === 1}
          aria-label="Página anterior"
        >
          ← Anterior
        </button>

        {pageNumbers.map((page, index) => {
          if (page === '...') {
            return (
              <span key={`dots-${index}`} className="pagination-dots">
                ...
              </span>
            );
          }

          return (
            <button
              key={page}
              className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
              onClick={() => onPageChange(page as number)}
              aria-label={`Ir para página ${page}`}
              aria-current={currentPage === page ? 'page' : undefined}
            >
              {page}
            </button>
          );
        })}

        <button
          className="pagination-btn pagination-arrow"
          onClick={handleNext}
          disabled={currentPage === totalPages}
          aria-label="Próxima página"
        >
          Próxima →
        </button>
      </div>

      <div className="pagination-jump">
        <label htmlFor="page-jump">Ir para:</label>
        <input
          id="page-jump"
          type="number"
          min="1"
          max={totalPages}
          placeholder="Nº"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              const value = parseInt((e.target as HTMLInputElement).value);
              if (value >= 1 && value <= totalPages) {
                onPageChange(value);
                (e.target as HTMLInputElement).value = '';
              }
            }
          }}
        />
      </div>
    </div>
  );
};

export default Pagination;
