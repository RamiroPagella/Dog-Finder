import style from "./detail.module.scss";
import { useState } from "react";
import { useParams } from "react-router-dom";
import FullSizeImage from "../../components/DetailComponents/FullSizeImage/FullSizeImage";
import DogDescription from "../../components/DetailComponents/DogDescription/DogDescription";
import { Loader, HeartFill } from "../../assets/icons/OtherIcons";
import { Heart } from "../../assets/icons/navBarIcons";
import DetailHeader from "../../components/DetailComponents/DetailHeader/DetailHeader";
import useDogDetail from "../../hooks/useDogDetail";
import toast, { Toaster } from "react-hot-toast";
import { useUserContext } from "../../hooks/contextHooks";

const Detail = () => {
  const { id } = useParams();
  const { dog, isError, error, hasNextAndPrev } = useDogDetail(id as string);
  const [isImageOpen, setIsImageOpen] = useState<boolean>(false);
  const [isFav, setIsFav] = useState<boolean>(false);
  const [showToolTip, setShowToolTip] = useState<boolean>(false);
  const { isAuthenticated } = useUserContext();

  const handleClick = () => {
    setIsImageOpen(!isImageOpen);
  };

  const handleFav = () => {
    if (!isAuthenticated) {
      toast.error("Debes iniciar sesión", {
        style: {
          backgroundColor: "var(--color7)",
          color: "var(--color4)",
          pointerEvents: "none",
        },
      });
      return;
    }
  };

  return (
    <div className={style.Detail}>

      {isError ? (
        <p>{error?.message}</p>
      ) : dog ? (
        <>
          <DetailHeader
            name={dog?.name}
            id={id}
            hasNextAndPrev={hasNextAndPrev}
          />

          <div className={style.content}>
            <div className={style.imageContainer} onClick={handleClick}>
              <img src={dog?.img} />
            </div>

            <div className={style.iconContainer}>
              {isFav ? (
                <HeartFill
                  className={style.favIcon}
                  onClick={handleFav}
                  onMouseEnter={() => setShowToolTip(true)}
                  onMouseLeave={() => setShowToolTip(false)}
                />
              ) : (
                <Heart
                  className={style.favIcon}
                  onClick={handleFav}
                  onMouseEnter={() => setShowToolTip(true)}
                  onMouseLeave={() => setShowToolTip(false)}
                />
              )}
              {showToolTip ? (
                <p className={style.favTooltip}>
                  {isFav ? "Eliminar de favoritos" : "Agregar a favoritos"}
                </p>
              ) : null}
            </div>

            <DogDescription
              breedGroup={dog?.breedGroup}
              height={dog?.height}
              lifeSpan={dog?.lifeSpan}
              temperaments={dog?.temperaments}
              weight={dog?.weight}
            />
          </div>

          {isImageOpen ? (
            <FullSizeImage
              img={dog?.img}
              setIsImageOpen={() => {
                setIsImageOpen(false);
              }}
            />
          ) : null}
        </>
      ) : (
        <div className={style.loaderContainer}>
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Detail;
