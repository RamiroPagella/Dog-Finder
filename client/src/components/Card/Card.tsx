import style from "./card.module.scss";
import { useEffect, useState } from "react";
import { Heart, HeartFill } from "../../assets/icons";
import { useUserContext } from "../../hooks/contextHooks";
import { Dog } from "../../types";
import { Link } from "react-router-dom";
import { favDog } from "../../services/dogsServices";
import { errorToast } from "../../toasts";

const Card = (props: Dog) => {
  const [hover, setHover] = useState<boolean>(false);
  const {
    isAuthenticated,
    User: { likes },
    setUser,
  } = useUserContext();
  const [isFav, setIsFav] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFav = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!isAuthenticated) {
      errorToast('Debes iniciar sesión')
      return;
    }
    if (isLoading) return;

    setIsLoading(true);
    favDog(props.id)
      .then(({ data }) => {
        setUser(data.User);
        setIsFav(data.isFav);
        setIsLoading(false);
      })
      .catch((err) => {
        err instanceof Error && errorToast(err.message);
        setIsLoading(false);
        setIsFav(false);
        console.log(err);
      });
  };

  useEffect(() => {
    likes?.map((dog: Dog) => {
      if (Number(dog.id) === Number(props.id)) {
        setIsFav(true);
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        {isFav ? (
          <HeartFill className={style.icon} />
          ) : (
          <Heart className={style.icon} />
        )}
      </div>

      <p className={style.text}>Click para ver mas</p>
    </div>
  );

  return (
    <Link className={style.Card} to={`/dog/${props.id}`}>
      {content}
      {hoverContent}
    </Link>
  );
};

export default Card;
