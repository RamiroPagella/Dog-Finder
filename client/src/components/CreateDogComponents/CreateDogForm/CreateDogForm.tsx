import { CloseButton } from "../../../assets/icons";
import { Dog } from "../../../types";
import style from "./createDogForm.module.scss";

type inputValue = {
  min: string;
  max: string;
}
interface Props {
  selectedBreedGroup: string;
  selectedTemps: string[];
  deleteTemp: (temp: string, selectedTemps: Dog["temperaments"]) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputValues: {
    height: inputValue;
    weight: inputValue;
    lifeSpan: inputValue;
  };
}

const CreateDogForm = ({
  selectedBreedGroup,
  selectedTemps,
  deleteTemp,
  handleInputChange,
  inputValues,
}: Props) => {

  return (
    <div className={style.CreateDogForm}>
      <div className={style.sections}>
        <section className={style.heightWeightSection}>
          <div
            className={style.title}
            style={{ justifyContent: "space-between", padding: "0 10%" }}
          >
            <h3> Altura (cm) </h3>
            <h3> Peso (kg) </h3>
          </div>

          <div className={style.content}>
            <div>
              <input
                placeholder="Desde"
                onChange={handleInputChange}
                value={inputValues?.height.min}
                name="min-height"
              />
              -
              <input
                placeholder="Hasta"
                onChange={handleInputChange}
                value={inputValues?.height.max}
                name="max-height"
              />
            </div>
            <div>
              <input
                placeholder="Desde"
                onChange={handleInputChange}
                value={inputValues?.weight.min}
                name="min-weight"
              />
              -
              <input
                placeholder="Hasta"
                onChange={handleInputChange}
                value={inputValues?.weight.max}
                name="max-weight"
              />
            </div>
          </div>
        </section>

        <section>
          <h3 className={style.title}> Esperanza de vida </h3>
          <div className={style.content}>
            <input
              placeholder="Desde"
              onChange={handleInputChange}
              value={inputValues?.lifeSpan.min}
              name="min-lifeSpan"
            />
            -
            <input
              placeholder="Hasta"
              onChange={handleInputChange}
              value={inputValues?.lifeSpan.max}
              name="max-lifeSpan"
            />
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
            {selectedTemps.map((temp, i) => (
              <div onClick={() => deleteTemp(temp, selectedTemps)} key={i}>
                {temp}
                <CloseButton style={{ height: "20px" }} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default CreateDogForm;
