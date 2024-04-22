import { useEffect, useState } from "react";
import style from "./exploreHeader.module.scss";
import Filters from "../Filters/Filters";
import Sorting from "../Sorting/Sorting";
import {
  usePagingContext,
  useSearchAndFiltersContext,
} from "../../../hooks/contextHooks";
import { Checkbox, CheckboxChecked } from "../../../assets/icons";

const ExploreHeader = () => {
  const { searchAndFilters, setSearchAndFilters } =
    useSearchAndFiltersContext();
  const { setCurrentPage } = usePagingContext();
  const [filtersOpen, setFiltersOpen] = useState<boolean>(false);
  const [sortingOpen, setSortingOpen] = useState<boolean>(false);
  const [filtersUsed, setFiltersUsed] = useState<boolean>(false);

  const setOnlyCreated = (b: boolean) => {
    setCurrentPage(1);
    setSearchAndFilters((prev) => ({ ...prev, onlyCreated: b }));
  };

  useEffect(() => {
    const { height, weight, lifeSpan, temperaments, breedGroups } =
      searchAndFilters;
    if (
      height === "0 - 1000" &&
      weight === "0 - 1000" &&
      lifeSpan === "0 - 1000" &&
      !temperaments.length &&
      !breedGroups.length
    ) {
      setFiltersUsed(false);
    } else {
      setFiltersUsed(true);
    }
  }, [searchAndFilters]);

  return (
    <div className={style.ExploreHeader}>
      <h1>Explorar</h1>

      <div className={style.buttons}>
        <button onClick={() => setOnlyCreated(!searchAndFilters.onlyCreated)}>
          Solo creados por usuarios
          {searchAndFilters.onlyCreated ? <CheckboxChecked /> : <Checkbox />}
        </button>
        <button onClick={() => setSortingOpen(true)}>Ordenar</button>
        <button onClick={() => setFiltersOpen(true)}>
          Filtrar
          {filtersUsed && <div className={style.point}></div>}
        </button>
      </div>

      {filtersOpen && <Filters setFiltersOpen={setFiltersOpen} />}
      {sortingOpen && <Sorting setSortingOpen={setSortingOpen} />}
    </div>
  );
};

export default ExploreHeader;
