import style from "./description.module.scss";

interface Props {
  filtersOpen: boolean;
  setFiltersOpen: (boolean: boolean) => void;
}

const Description = ({ filtersOpen, setFiltersOpen }: Props) => {
  return (
    <div className={style.Description}>
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

export default Description;
