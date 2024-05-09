import style from "./card.module.scss";
import { useEffect, useState } from "react";
import { DeleteIcon, Heart, HeartFill } from "../../assets/icons";
import { useAppContext, useUserContext } from "../../hooks/contextHooks";
import { Dog } from "../../types";
import { Link, useLocation } from "react-router-dom";
import { favDog } from "../../services/dogsServices";
import useToasts from "../../hooks/useToasts";
import DeleteDog from "../DeleteDogModal/DeleteDogModal";

const Card = (props: Dog) => {
  const { errorToast } = useToasts();
  const { pathname } = useLocation();
  const { setBackRoute } = useAppContext();
  const [hover, setHover] = useState<boolean>(false);
  const {
    isAuthenticated,
    User: { likes, admin },
    setUser,
  } = useUserContext();
  const [isFav, setIsFav] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const navTo =
    pathname === "/"
      ? `/dog/${props.id}`
      : pathname.includes("/favorites")
        ? `/favorite/${props.id}`
        : pathname.includes("accepted")
          ? `/my-dog/${props.id}`
          : `/my-dog/pending/${props.id}`;

  const handleCardClick = () => {
    setBackRoute(pathname);
    console.log(navTo);
  };

  const handleFav = async (e: React.MouseEvent<SVGSVGElement>) => {
    e.preventDefault();
    if (!isAuthenticated) {
      errorToast("Debes iniciar sesión");
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
      <div className={style.iconsContainer}>
        {(pathname === "/profile/my-dogs" || admin) && (
          <DeleteIcon
            onClick={(e) => {
              e.preventDefault();
              setOpenDelete(true);
            }}
          />
        )}
        {pathname !== "/profile/my-dogs/pending" &&
          (isFav ? (
            <HeartFill onClick={handleFav} />
          ) : (
            <Heart onClick={handleFav} />
          ))}
      </div>

      <p className={style.text}>Click para ver mas</p>
    </div>
  );

  return (
    <>
      <Link className={style.Card} to={navTo} onClick={handleCardClick}>
        {content}
        {hoverContent}
      </Link>

      {openDelete && (
        <DeleteDog
          setOpenDelete={setOpenDelete}
          id={props.id}
          isDogPending={pathname.includes("/pending")}
          isInDogDetail={false}
        />
      )}
    </>
  );
};

export default Card;
