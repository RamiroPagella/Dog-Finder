import style from "./card.module.scss";
import { useState } from "react";
import { Heart } from "../../../icons/navBarIcons";
import { useUserContext } from "../../../hooks/contextHooks";
import toast, { Toaster } from "react-hot-toast";
import { Dog } from "../../../types";
import { Link } from "react-router-dom";

const Card = (props: Dog) => {
  const [hover, setHover] = useState<boolean>(false);
  const { isAuthenticated } = useUserContext();

  const handleFav = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!isAuthenticated)
      toast.error("Debes iniciar sesión", {
        style: {
          backgroundColor: "var(--color8)",
          color: "var(--color4)",
          pointerEvents: 'none',
        },
      });
  };

  const content = (
    <div className={hover ? style.content_on : style.content}>
      <div className={style.blurImgContainer}>
        <img src={props?.img} />
      </div>
      <div className={style.imgContainer}>
        <img src={props?.img} alt="Imagen del perro" />
      </div>

      <div className={style.Description}>
        <div>
          <h4>Nombre:</h4>
          <p>{props?.name}</p>
        </div>
        <div>
          <h4>Raza:</h4>
          <p>{props?.breedGroup}</p>
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
      <div className={style.iconContainer} onClick={handleFav}>
        <Heart className={hover ? style.icon_on : style.icon} />
      </div>

      <p className={hover ? style.text_on : style.text}>Click para ver mas</p>
    </div>
  );

  return (
    <Link className={style.Card} to={`/dog/:${props.id}`}>
      <Toaster />
      {content}
      {hoverContent}
    </Link>
  );
};

export default Card;
