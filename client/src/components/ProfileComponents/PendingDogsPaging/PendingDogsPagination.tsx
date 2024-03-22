import style from './pendingDogsPagination.module.scss';
import { ArrowLeft, ArrowRight } from '../../../assets/icons';
import { usePagingContext } from '../../../hooks/contextHooks';

const PendingDogsPagination = () => {
  const { pendingsCurrentPage, setPendingsCurrentPage, pendingsTotalPages } = usePagingContext();

  const visiblePages = 9;
  const halfVisiblePages = Math.floor(visiblePages / 2);

  const startPage = Math.max(1, pendingsCurrentPage - halfVisiblePages);
  const endPage = Math.min(pendingsTotalPages, startPage + visiblePages - 1);

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => i + startPage,
  );

  const handleBack = () => {
    if (pendingsCurrentPage <= 1) return;
    setPendingsCurrentPage(pendingsCurrentPage - 1);
  };
  const handleNext = () => {
    if (pendingsCurrentPage >= pendingsTotalPages) return;
    setPendingsCurrentPage(pendingsCurrentPage + 1);
  };

  return (
    <div className={style.PaginationBar}>
      <button className={style.arrowButton} onClick={handleBack}>
        <ArrowLeft className={style.icon} />
      </button>
      <div className={style.pages}>
        {pages.map((page, i) => (
          <div
            key={i}
            className={`${style.pageNumber} ${page === pendingsCurrentPage ? style.pageNumber_on : ""}`}
            onClick={() => {
              setPendingsCurrentPage(page);
            }}
          >
            {page}
          </div>
        ))}
      </div>
      <button className={style.arrowButton} onClick={handleNext}>
        <ArrowRight className={style.icon} />
      </button>
    </div>
  );
}

export default PendingDogsPagination;