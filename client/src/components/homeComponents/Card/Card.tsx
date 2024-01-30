import { Ref, forwardRef } from "react";
import { DogType } from "../../../types";
import style from "./card.module.scss";



const Card = forwardRef((props: DogType, ref: Ref<HTMLDivElement>) => {
  const content = (
    <>
      <div className={style.blurImgContainer}>
        <img src={props.img} />
      </div>
      <div className={style.imgContainer}>
        <img src={props.img} alt="Imagen del perro" />
      </div>

      <div className={style.Description}>
        <div>
          <h4>Nombre:</h4>
          <p>{props.name}</p>
        </div>
        <div>
          <h4>Raza:</h4>
          <p>{props.breedGroup}</p>
        </div>
      </div>
    </>
  );

  return ref ? (
    <div className={style.Card} ref={ref}>
      {content}
    </div>
  ) : (
    <div className={style.Card}>{content}</div>
  );
});

export default Card;
