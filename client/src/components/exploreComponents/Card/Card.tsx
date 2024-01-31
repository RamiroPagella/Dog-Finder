import { Ref, forwardRef, useState } from "react";
import { DogType } from "../../../types";
import style from "./card.module.scss";
import { Heart } from "../../../icons/navBarIcons";

const Card = forwardRef((props: DogType, ref: Ref<HTMLDivElement>) => {
  const [hover, setHover] = useState<boolean>(false);

  const content = (
    <div className={hover ? style.content_on : style.content}>
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
    </div>
  );

  const hoverContent = (
    <div
      className={style.hoverContent}
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
    >
      <Heart className={hover ? style.icon_on : style.icon}/>

      <p className={hover ? style.text_on : style.text}>
        Click para ver mas
      </p>
    </div>
  );

  return ref ? (
    <div className={style.Card} ref={ref}>
      {content}
      {hoverContent}
    </div>
  ) : (
    <div className={style.Card}>
      {content}
      {hoverContent}
    </div>
  );
});

export default Card;
