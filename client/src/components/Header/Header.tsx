import { useState } from "react";
import style from "./header.module.scss";
import Filters from "../exploreComponents/Filters/Filters";

interface Props {
  path: "create-dog" | "explore" | "favorites";
}

const Header = ({ path }: Props) => {
  const [filtersOpen, setFiltersOpen] = useState<boolean>();


  if (path === 'favorites') return (
    <h1 className={style.favHeader}>
      Favoritos
    </h1>
  )

  else if (path === 'explore') return (
    <div className={style.ExploreHeader}>
      <h1>Explorar</h1>

      <p>
        En esta seccion podras explorar dentro de un universo de caninos con
        caracteristicas unicas.
      </p>

      <button onClick={() => {setFiltersOpen(!filtersOpen)}} > Abrir Filtros </button>

      {filtersOpen ? <Filters setFiltersOpen={(boolean) => {setFiltersOpen(boolean)}} /> : null}
    </div>
  )

  else if (path === 'create-dog') return (
    <h1 className={style.favHeader}>
      Crear Perro
    </h1>
  )
};

export default Header;
