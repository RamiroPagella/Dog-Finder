import style from "./detail.module.scss";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FullSizeImage from "../../components/DetailComponents/FullSizeImage/FullSizeImage";
import DogDescription from "../../components/DetailComponents/DogDescription/DogDescription";
import { Heart, Loader, HeartFill } from "../../assets/icons";
import DetailHeader from "../../components/DetailComponents/DetailHeader/DetailHeader";
import useDogDetail from "../../hooks/useDogDetail";
import toast from "react-hot-toast";
import { useUserContext } from "../../hooks/contextHooks";
import { favDog } from "../../services/dogsServices";

const Detail = () => {
  const { id } = useParams();
  const { isAuthenticated, User, setUser } = useUserContext();
  const [isDogPending, setIsDogPenging] = useState<boolean>(false);
  const { dog, isError, error, hasNextAndPrev } = useDogDetail(id as string);
  const [isImageOpen, setIsImageOpen] = useState<boolean>(false);
  const [isFav, setIsFav] = useState<boolean>(false);
  const [showToolTip, setShowToolTip] = useState<boolean>(false);
  const [isFavLoading, setIsFavLoading] = useState<boolean>(false);


  const handleClick = () => {
    setIsImageOpen(!isImageOpen);
  };

  const handleFav = async () => {
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
    if (isFavLoading) return;

    setIsFavLoading(true);
    favDog(id as string)
      .then(({ data }) => {
        setUser(data.User);
        setIsFav(data.isFav);
        setIsFavLoading(false);
      })
      .catch((err: Error) => {
        toast.error(err.message, {
          style: {
            backgroundColor: "var(--color7)",
            color: "var(--color4)",
            pointerEvents: "none",
          },
        });
        setIsFavLoading(false);
        setIsFav(false);
        console.log(err);
      });
  };

  useEffect(() => {
    if (id) {
      const uuidPattern =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      const isUuid = uuidPattern.test(id);

      if (isUuid) {
        setIsDogPenging(true);
      } else {
        if (isAuthenticated)
          User.likes?.map((dog) => {
            if (Number(dog.id) === Number(id)) setIsFav(isFav);
          });
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

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
