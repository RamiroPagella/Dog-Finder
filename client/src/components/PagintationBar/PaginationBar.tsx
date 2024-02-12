import style from "./paginationBar.module.scss";
import { ArrowLeft } from "../../assets/icons/PaginationIcons";
import { ArrowRight } from "../../assets/icons/PaginationIcons";
import { usePagingContext } from "../../hooks/contextHooks";

const PaginationBar = () => {
  const { currentPage, setCurrentPage, totalPages } = usePagingContext();

  const visiblePages = 9;
  const halfVisiblePages = Math.floor(visiblePages / 2);

  const startPage = Math.max(1, currentPage - halfVisiblePages);
  const endPage = Math.min(totalPages, startPage + visiblePages - 1);

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => i + startPage,
  );

  const handleBack = () => {
    if (currentPage <= 1) return;
    setCurrentPage(currentPage - 1);
  };
  const handleNext = () => {
    if (currentPage >= totalPages) return;
    setCurrentPage(currentPage + 1);
  };

  return (
    <div className={style.PaginationBar}>
      <button className={style.arrowButton} onClick={handleBack}>
        <ArrowLeft className={style.icon} />
      </button>
      <div className={style.pages}>
        {pages.map((page) => (
          <div
            className={`${style.pageNumber} ${page === currentPage ? style.pageNumber_on : ""}`}
            onClick={() => {
              setCurrentPage(page);
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
};

export default PaginationBar;
