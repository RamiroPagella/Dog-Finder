import { DogType } from "../../../../types";
import style from "./card.module.scss";



const Card = ({
  breedGroup,
  height,
  weight,
  img,
  lifeSpan,
  temperaments,
  name,
  id,
}: DogType) => {
  return <div className={style.Card}>
    <img src={img} alt="Imagen del perro"/>

    <div className={style.Description}>
      <div>
        <h4>Nombre:</h4>
        <p>{name}</p>
      </div>  
      <div>
        <h4>Raza:</h4>
        <p>{breedGroup}</p>
      </div>
    </div>
  </div>;
};

export default Card;
