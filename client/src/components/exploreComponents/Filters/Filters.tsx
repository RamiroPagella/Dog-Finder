import style from "./filters.module.scss";
import { createPortal } from "react-dom";
import { CloseButton, Plus } from "../../../assets/icons";
import { useState } from "react";
import BreedGroupsPanel from "../BreedGroupsPanel/BreedGroupsPanel";
import TemperamentsPanel from "../TemperamentsPanel/TemperamentsPanel";
import useFilters from "../../../hooks/useFilters";
import { usePagingContext } from "../../../hooks/contextHooks";

interface Props {
  setFiltersOpen: (boolen: boolean) => void;
}

const Filters = ({ setFiltersOpen }: Props) => {
  const body = document.querySelector("body") as Element;
  const [openBreedGroupPanel, setOpenBreedGroupPanel] =
    useState<boolean>(false);
  const [openTemperamentsPanel, setOpenTemperamentsPanel] =
    useState<boolean>(false);
  const {
    searchAndFiltersLocal,
    setSearchAndFiltersLocal,
    height,
    weight,
    lifeSpan,
    handleInputChange,
    applyFilters,
    cleanFilters,
  } = useFilters();

  return (
    <>
      {createPortal(
        <div className={style.FiltersContainer}>
          <div className={style.filters}>
            <h1>
              Filtros de búsqueda
              <CloseButton
                className={style.closeButton}
                onClick={() => {
                  setFiltersOpen(false);
                }}
              />
            </h1>

            <section className={style.heightWeightSection}>
              <div
                className={style.title}
                style={{
                  justifyContent: "space-between",
                  padding: "0 10%",
                }}
              >
                <h3>Altura</h3>

                <h3>Peso</h3>
              </div>

              <div className={style.content}>
                <div className={style.height}>
                  <input
                    placeholder="Desde"
                    name="min-height"
                    onChange={handleInputChange}
                    value={height.min}
                  />
                  -
                  <input
                    placeholder="Hasta"
                    name="max-height"
                    onChange={handleInputChange}
                    value={height.max}
                  />
                </div>

                <div className={style.weight}>
                  <input
                    placeholder="Desde"
                    name="min-weight"
                    value={weight.min}
                    onChange={handleInputChange}
                  />
                  -
                  <input
                    placeholder="Hasta"
                    name="max-weight"
                    value={weight.max}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </section>

            <section className={style.lifeSpanSection}>
              <h3 className={style.title}> Esperanza de vida </h3>

              <div className={style.content}>
                <input
                  placeholder="Desde"
                  name="min-lifeSpan"
                  value={lifeSpan.min}
                  onChange={handleInputChange}
                />
                -
                <input
                  placeholder="Hasta"
                  name="max-lifeSpan"
                  value={lifeSpan.max}
                  onChange={handleInputChange}
                />
              </div>
            </section>

            <section className={style.breedGroupsSection}>
              <h3 className={style.title}>
                Grupo de razas
                <Plus onClick={() => setOpenBreedGroupPanel(true)} />
              </h3>

              <div className={style.content}>
                {searchAndFiltersLocal.breedGroups.map((bg) => (
                  <div
                    className={style.breedGroupItem}
                    onClick={() => {
                      setSearchAndFiltersLocal({
                        ...searchAndFiltersLocal,
                        breedGroups: searchAndFiltersLocal.breedGroups.filter(
                          (breedG) => breedG !== bg,
                        ),
                      });
                    }}
                  >
                    {bg}

                    <CloseButton style={{ height: "20px" }} />
                  </div>
                ))}
              </div>
            </section>

            <section className={style.temperamentsSection}>
              <h3 className={style.title}>
                Temperamentos
                <Plus
                  onClick={() => {
                    setOpenTemperamentsPanel(true);
                  }}
                />
              </h3>
              <div className={style.content}>
                {searchAndFiltersLocal.temperaments.map((temperament) => (
                  <div
                    className={style.temperamentItem}
                    onClick={() =>
                      setSearchAndFiltersLocal({
                        ...searchAndFiltersLocal,
                        temperaments: searchAndFiltersLocal.temperaments.filter(
                          (temp) => temp !== temperament,
                        ),
                      })
                    }
                  >
                    {temperament}

                    <CloseButton style={{ height: "20px" }} />
                  </div>
                ))}
              </div>
            </section>

            <div style={{ display: "flex" }}>
              <button
                onClick={() => {
                  cleanFilters();
                }}
              >
                Limpiar
              </button>

              <button
                onClick={() => {applyFilters(setFiltersOpen)}}
              >
                Aplicar
              </button>
            </div>

            {openBreedGroupPanel ? (
              <BreedGroupsPanel
                setOpenBreedGroupPanel={(boolean) => {
                  setOpenBreedGroupPanel(boolean);
                }}
                setSearchAndFiltersLocal={setSearchAndFiltersLocal}
                breedGroups={searchAndFiltersLocal.breedGroups}
              />
            ) : null}

            {openTemperamentsPanel ? (
              <TemperamentsPanel
                setOpenTemperamentsPanel={(boolean: boolean) => {
                  setOpenTemperamentsPanel(boolean);
                }}
                setSearchAndFiltersLocal={setSearchAndFiltersLocal}
                temperaments={searchAndFiltersLocal.temperaments}
              />
            ) : null}
          </div>
        </div>,
        body,
      )}
    </>
  );
};

export default Filters;
