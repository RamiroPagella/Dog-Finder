import style from "./dogDescription.module.scss";
import { Dog as DogType } from "../../../types";

interface Props {
  breedGroup: DogType["breedGroup"] | undefined;
  height: DogType["height"] | undefined;
  lifeSpan: DogType["lifeSpan"] | undefined;
  temperaments: DogType["temperaments"] | undefined;
  weight: DogType["weight"] | undefined;
}

const DogDescription = ({
  breedGroup,
  height,
  lifeSpan,
  temperaments,
  weight,
}: Props) => {
  return (
    <div className={style.DogDescription}>
      <div className={style.infoContainer}>
        <h3 className={style.propertyName}>Temperamentos:</h3>

        <p className={style.propertyValue}>
          {Array.isArray(temperaments)
            ? temperaments.join(" - ")
            : temperaments}
        </p>
      </div>
      <div className={style.infoContainer}>
        <h3 className={style.propertyName}>Grupo de razas:</h3>

        <p className={style.propertyValue}>{breedGroup}</p>
      </div>
      <div className={style.infoContainer}>
        <h3 className={style.propertyName}>Altura:</h3>

        <p className={style.propertyValue}>{height}</p>
      </div>
      <div className={style.infoContainer}>
        <h3 className={style.propertyName}>Peso: </h3>
        <p className={style.propertyValue}>{weight}</p>
      </div>
      <div className={style.infoContainer}>
        <h3 className={style.propertyName}>Esperanza de vida:</h3>
        <p className={style.propertyValue}>{lifeSpan}</p>
      </div>
    </div>
  );
};

export default DogDescription;
