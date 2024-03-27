import style from "./sorting.module.scss";
import { createPortal } from "react-dom";
import { CloseButton } from "../../../assets/icons";
import { useEffect, useState } from "react";
import { Filters } from "../../../types";
import { useSearcAndfiltersContext } from "../../../hooks/contextHooks";

interface Props {
  setSortingOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sorting = ({ setSortingOpen }: Props) => {
  const rootElement = document.getElementById("root") as Element;
  const [selected, setSelected] = useState<Filters["sort"]>("A-Z");
  const { setSearchAndFilters, searchAndFilters } = useSearcAndfiltersContext();

  const handleClick = () => {
    setSearchAndFilters((prev) => ({ ...prev, sort: selected }));
    setSortingOpen(false);
  };

  useEffect(() => {
    setSelected(searchAndFilters.sort);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return createPortal(
    <div className={style.Container}>
      <div className={style.sorting}>
        <h1>
          Ordenar
          <CloseButton
            className={style.closeButton}
            onClick={() => {
              setSortingOpen(false);
            }}
          />
        </h1>

        <section>
          <h3>Nombre</h3>
          <div className={style.buttons}>
            <button
              className={selected === "A-Z" ? style.selected : ""}
              onClick={() => setSelected("A-Z")}
            >
              A-Z
            </button>
            <button
              className={selected === "Z-A" ? style.selected : ""}
              onClick={() => setSelected("Z-A")}
            >
              Z-A
            </button>
          </div>
        </section>
        <section>
          <h3>Altura</h3>
          <div className={style.buttons}>
            <button
              className={selected === "height asc" ? style.selected : ""}
              onClick={() => setSelected("height asc")}
            >
              Ascendente
            </button>
            <button
              className={selected === "height desc" ? style.selected : ""}
              onClick={() => setSelected("height desc")}
            >
              Descendente
            </button>
          </div>
        </section>
        <section>
          <h3>Peso</h3>
          <div className={style.buttons}>
            <button
              className={selected === "weight asc" ? style.selected : ""}
              onClick={() => setSelected("weight asc")}
            >
              Ascendente
            </button>
            <button
              className={selected === "weight desc" ? style.selected : ""}
              onClick={() => setSelected("weight desc")}
            >
              Decendente
            </button>
          </div>
        </section>

        <button className={style.applyBtn} onClick={handleClick}>
          Aplicar
        </button>
      </div>
    </div>,
    rootElement,
  );
};

export default Sorting;
