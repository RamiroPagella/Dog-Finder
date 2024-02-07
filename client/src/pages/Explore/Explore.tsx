import style from "./explore.module.scss";
import { useState } from "react";
import Cards from "../../components/exploreComponents/Cards/Cards";
import PaginationBar from "../../components/PagintationBar/PaginationBar";
import Description from "../../components/exploreComponents/Description/Description";

const Explore = () => {
  const [filtersOpen, setFiltersOpen] = useState<boolean>(false);

  return (
    <div className={style.Explore}>
      
      <Description filtersOpen={filtersOpen} setFiltersOpen={(boolean) => {setFiltersOpen(boolean)}}/>

      <div className={filtersOpen ? style.Filters_open : style.Filters}>
        <div className={filtersOpen ? style.filters_open : style.filters}>
          <div>Filtro 1</div>
          <div>Filtro 2</div>
          <div>Filtro 3</div>
        </div>
      </div>

      <Cards/>

      <PaginationBar />
    </div>
  );
};

export default Explore;


