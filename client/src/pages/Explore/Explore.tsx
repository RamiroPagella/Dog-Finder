import style from "./explore.module.scss";
import { useState } from "react";
import Cards from "../../components/exploreComponents/Cards/Cards";
import PaginationBar from "../../components/PagintationBar/PaginationBar";
import Description from "../../components/exploreComponents/ExploreHeader/ExploreHeader";
import Filters from "../../components/exploreComponents/Filters/Filters";

const Explore = () => {
  const [filtersOpen, setFiltersOpen] = useState<boolean>(false);


  return (
    <div className={style.Explore}>
      
      <Description filtersOpen={filtersOpen} setFiltersOpen={(boolean) => {setFiltersOpen(boolean)}}/>

      <Filters filtersOpen={filtersOpen}/>

      <Cards filtersOpen={filtersOpen}/>

      <PaginationBar />
    </div>
  );
};

export default Explore;


