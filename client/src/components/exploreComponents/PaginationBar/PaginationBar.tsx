import style from "./paginationBar.module.scss";
import { ArrowLeft, ArrowRight } from "../../../assets/icons";
import { usePagingContext } from "../../../hooks/contextHooks";
import { useEffect, useState } from "react";

const PaginationBar = () => {
  const { currentPage, setCurrentPage, totalPages } = usePagingContext();
  const [visiblePages, setVisiblePages] = useState<number>(9);

  const halfVisiblePages = Math.floor(visiblePages / 2);

  const startPage = Math.max(1, currentPage - halfVisiblePages);
  const endPage = Math.min(totalPages, startPage + visiblePages - 1);

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => i + startPage,
  );

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "auto",
    });
  };

  const handleBack = () => {
    if (currentPage <= 1) return;
    setCurrentPage(currentPage - 1);
  };
  const handleNext = () => {
    if (currentPage >= totalPages) return;
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    const handleResize = () => {
      const { innerWidth } = window;
      if (innerWidth <= 770 && innerWidth > 400) {
        setVisiblePages(5);
      } else if (innerWidth <= 400) {
        setVisiblePages(3);
      } else {
        setVisiblePages(9);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={style.PaginationBar}>
      <button className={style.arrowButton} onClick={handleBack}>
        <ArrowLeft className={style.icon} />
      </button>
      <div className={style.pages}>
        {pages.map((page, i) => (
          <div
            key={i}
            className={`${style.pageNumber} ${page === currentPage ? style.pageNumber_on : ""}`}
            onClick={() => {
              setCurrentPage(page);
              scrollToBottom();
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
