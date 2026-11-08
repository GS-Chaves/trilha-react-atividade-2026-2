export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const pageCount = Math.max(1, Math.floor(totalPages) || 1);
  const page = Math.max(1, Math.min(pageCount, currentPage));

  return (
    <nav className="pagination" aria-label="Paginação das aulas">
      <button
        className="pagination-arrow"
        type="button"
        aria-label="Página anterior"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="m14 6-6 6 6 6"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span>Anterior</span>
      </button>
      <div className="pagination-pages">
        {Array.from({ length: pageCount }, (_, index) => index + 1).map(
          (number) => (
            <button
              key={number}
              className={`pagination-page${page === number ? " is-active" : ""}`}
              type="button"
              aria-label={`Página ${number}`}
              aria-current={page === number ? "page" : undefined}
              onClick={() => onPageChange(number)}
            >
              {number}
            </button>
          ),
        )}
      </div>
      <button
        className="pagination-arrow"
        type="button"
        aria-label="Próxima página"
        disabled={page === pageCount}
        onClick={() => onPageChange(page + 1)}
      >
        <span>Próxima</span>
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="m10 6 6 6-6 6"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </nav>
  );
}
