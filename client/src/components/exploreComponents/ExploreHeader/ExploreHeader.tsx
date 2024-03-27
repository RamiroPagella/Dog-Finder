import { useState } from "react";
import style from "./exploreHeder.module.scss";
import Filters from "../Filters/Filters";
import Sorting from "../Sorting/Sorting";

const ExploreHeader = () => {
  const [filtersOpen, setFiltersOpen] = useState<boolean>(false);
  const [sortingOpen, setSortingOpen] = useState<boolean>(false);

  return (
    <div className={style.ExploreHeader}>
      <h1>Explorar</h1>

      <p>
        En esta seccion podras explorar dentro de un universo de caninos con
        caracteristicas unicas.
      </p>

      <div className={style.buttons}>
        <button onClick={() => setSortingOpen(true)}>
          Abrir ordenamientos
        </button>
        <button onClick={() => setFiltersOpen(true)}>Abrir Filtros</button>
      </div>

      {filtersOpen && <Filters setFiltersOpen={setFiltersOpen} />}
      {sortingOpen && <Sorting setSortingOpen={setSortingOpen} />}
    </div>
  );
};

export default ExploreHeader;
