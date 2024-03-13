import { CloseButton } from "../../../assets/icons";
import { Dog } from "../../../types";
import style from "./createDogForm.module.scss";

interface Props {
  selectedBreedGroup: string;
  selectedTemps: string[];
  setCreatedDog: React.Dispatch<React.SetStateAction<Omit<Dog, "id">>>;
}

const CreateDogForm = ({
  selectedBreedGroup,
  selectedTemps,
  setCreatedDog,
}: Props) => {
  const handleTempClick = (temp: string) => {
    setCreatedDog((prev) => ({
      ...prev,
      temperaments: selectedTemps.filter((tmp) => tmp !== temp),
    }));
  };

  return (
    <div className={style.CreateDogForm}>
      <div className={style.sections}>
        <section className={style.heightWeightSection}>
          <div
            className={style.title}
            style={{ justifyContent: "space-between", padding: "0 10%" }}
          >
            <h3> Altura </h3>
            <h3> Peso </h3>
          </div>

          <div className={style.content}>
            <div className={style.height}>
              <input placeholder="Desde" />
              -
              <input placeholder="Hasta" />
            </div>
            <div>
              <input placeholder="Desde" />
              -
              <input placeholder="Hasta" />
            </div>
          </div>
        </section>

        <section>
          <h3 className={style.title}> Esperanza de vida </h3>
          <div className={style.content}>
            <input placeholder="Desde" />
            -
            <input placeholder="Hasta" />
          </div>
        </section>

        <section className={style.breedGroupSection}>
          <h3 className={style.title}>Grupo de raza</h3>

          <div className={style.content}>
            {selectedBreedGroup !== "" ? (
              <div style={{ pointerEvents: "none" }}>{selectedBreedGroup}</div>
            ) : null}
          </div>
        </section>

        <section className={style.temperamentsSection}>
          <h3 className={style.title}>Temperamentos</h3>

          <div className={style.content}>
            {selectedTemps.map((temp) => (
              <div onClick={() => handleTempClick(temp)}>
                {temp}
                <CloseButton style={{ height: "20px" }} />
              </div>
            ))}
          </div>
        </section>
      </div>

      <button>Crear</button>
    </div>
  );
};

export default CreateDogForm;
