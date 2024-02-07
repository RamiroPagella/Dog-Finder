import style from "./dogDescription.module.scss";
import { Dog as DogType } from "../../../types";

type Props = Omit<DogType, "id" | "img" | "name">;

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
        <p className={style.propertyName}>Temperaments:</p>

        <p className={style.propertyValue}>
          {Array.isArray(temperaments)
            ? temperaments.join(" - ")
            : temperaments}
        </p>
      </div>
      <div className={style.infoContainer}>
        <p className={style.propertyName}>Grupo de razas:</p>

        <p className={style.propertyValue}>{breedGroup}</p>
      </div>
      <div className={style.infoContainer}>
        <p className={style.propertyName}>Altura:</p>

        <p className={style.propertyValue}>{height}</p>
      </div>
      <div className={style.infoContainer}>
        <p className={style.propertyName}>Esperanza de vida:</p>
        <p className={style.propertyValue}>{lifeSpan}</p>
      </div>
      <div className={style.infoContainer}>
        <p className={style.propertyName}>Weight: </p>
        <p className={style.propertyValue}>{weight}</p>
      </div>
    </div>
  );
};

export default DogDescription;
