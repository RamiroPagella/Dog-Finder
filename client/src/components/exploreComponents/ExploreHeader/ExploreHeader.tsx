import style from './exploreHeader.module.scss';

interface Props {
  filtersOpen: boolean;
  setFiltersOpen: (boolean: boolean) => void;
}

const ExploreHeader = ({ filtersOpen, setFiltersOpen }: Props) => {
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
        {filtersOpen ? "Cerrar filtros" : "Abrir Filtros"}
      </button>
    </div>
  );
};

export default ExploreHeader;
