import style from "./filters.module.scss";

interface Props {
  filtersOpen: boolean;
}

const Filters = ({ filtersOpen }: Props) => {
  return (
    <div className={filtersOpen ? style.Filters_open : style.Filters}>
      <div className={filtersOpen ? style.filters_open : style.filters}>
        <div>Filtro 1</div>
        <div>Filtro 2</div>
        <div>Filtro 3</div>
      </div>
    </div>
  );
};

export default Filters;
