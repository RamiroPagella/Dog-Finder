import { useState } from "react";
import style from "./exploreHeder.module.scss";
import Filters from "../Filters/Filters";

const ExploreHeader = () => {
  const [filtersOpen, setFiltersOpen] = useState<boolean>();


  return (
    <div className={style.ExploreHeader}>
      <h1>Explorar</h1>

      <p>
        En esta seccion podras explorar dentro de un universo de caninos con
        caracteristicas unicas.
      </p>

      <button
        onClick={() => {
          setFiltersOpen(!filtersOpen);
        }}
      >
        {" "}
        Abrir Filtros{" "}
      </button>

      {filtersOpen ? (
        <Filters
          setFiltersOpen={(boolean) => {
            setFiltersOpen(boolean);
          }}
        />
      ) : null}
    </div>
  );
};

export default ExploreHeader;
