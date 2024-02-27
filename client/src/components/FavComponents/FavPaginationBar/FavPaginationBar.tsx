import style from "./favPaginationBar.module.scss";
import { ArrowLeft, ArrowRight } from "../../../assets/icons";
import { usePagingContext } from "../../../hooks/contextHooks";

const FavPaginationBar = () => {
  const { favCurrentPage, setFavCurrentPage, favTotalPages } = usePagingContext();

  const visiblePages = 9;
  const halfVisiblePages = Math.floor(visiblePages / 2);

  const startPage = Math.max(1, favCurrentPage - halfVisiblePages);
  const endPage = Math.min(favTotalPages, startPage + visiblePages - 1);

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => i + startPage,
  );

  const handleBack = () => {
    if (favCurrentPage <= 1) return;
    setFavCurrentPage(favCurrentPage - 1);
  };
  const handleNext = () => {
    if (favCurrentPage >= favTotalPages) return;
    setFavCurrentPage(favCurrentPage + 1);
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
            className={`${style.pageNumber} ${page === favCurrentPage ? style.pageNumber_on : ""}`}
            onClick={() => {
              setFavCurrentPage(page);
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

export default FavPaginationBar;
