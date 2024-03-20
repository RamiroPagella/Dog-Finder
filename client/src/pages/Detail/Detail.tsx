import style from "./detail.module.scss";
import { useState } from "react";
import { useParams } from "react-router-dom";
import FullSizeImage from "../../components/DetailComponents/FullSizeImage/FullSizeImage";
import DogDescription from "../../components/DetailComponents/DogDescription/DogDescription";
import { Heart, Loader, HeartFill } from "../../assets/icons";
import DetailHeader from "../../components/DetailComponents/DetailHeader/DetailHeader";
import useDogDetail from "../../hooks/useDogDetail";

const Detail = () => {
  const params = useParams();
  const {
    dog,
    isError,
    error,
    prevAndNext,
    handleFav,
    isFav,
    isDogPending,
    isFavLoading,
  } = useDogDetail(Number(params?.id));
  const [isImageOpen, setIsImageOpen] = useState<boolean>(false);
  const [showToolTip, setShowToolTip] = useState<boolean>(false);

  const handleClick = () => {
    setIsImageOpen(!isImageOpen);
  };

  console.log(isDogPending);

  return (
    <div className={style.Detail}>
      {isError ? (
        <p>{error?.message}</p>
      ) : dog ? (
        <>
          <DetailHeader
            dogName={dog?.name}
            prevAndNext={prevAndNext}
            username={dog?.user?.username}
          />

          <div className={style.content}>
            <div className={style.imageContainer} onClick={handleClick}>
              <img src={dog?.img} className={style.blurImg} />
              <img src={dog?.img} className={style.img} />
            </div>

            {!isDogPending ? (
              <div className={style.iconContainer}>
                {isFavLoading ? (
                  <div className={style.favLoader}></div>
                ) : isFav ? (
                  <HeartFill
                    onClick={handleFav}
                    onMouseEnter={() => setShowToolTip(true)}
                    onMouseLeave={() => setShowToolTip(false)}
                  />
                ) : (
                  <Heart
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
            ) : null}

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
