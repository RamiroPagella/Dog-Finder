import style from "./explore.module.scss";
import { useState } from "react";
import Cards from "../../components/exploreComponents/Cards/Cards";

const Explore = () => {
  const [filtersOpen, setfiltersOpen] = useState<boolean>(false);


  return (
    <div className={style.Explore}>
      <div className={style.Presentation}>
        <h1>Explore</h1>

        <p>
          En esta seccion podras explorar dentro de un universo de caninos con
          caracteristicas unicas.
        </p>

        <button
          onClick={() => {
            setfiltersOpen(!filtersOpen);
          }}
        >
          {
            filtersOpen ? "Cerrar filtros" : "Abrir Filtros"
          }
        </button>
      </div>

      <div className={filtersOpen ? style.Filters_open : style.Filters} >
        <div className={filtersOpen ? style.filters_open : style.filters}>
          <div>Filtro 1</div>
          <div>Filtro 2</div>
          <div>Filtro 3</div>
        </div>
      </div>

      <Cards />
    </div>
  );
};

export default Explore;
