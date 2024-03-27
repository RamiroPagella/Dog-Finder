import style from "./detail.module.scss";
import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import FullSizeImage from "../../components/DetailComponents/FullSizeImage/FullSizeImage";
import DogDescription from "../../components/DetailComponents/DogDescription/DogDescription";
import {
  Heart,
  Loader,
  HeartFill,
  DeleteIcon,
  ModifyIcon,
} from "../../assets/icons";
import DetailHeader from "../../components/DetailComponents/DetailHeader/DetailHeader";
import useDogDetail from "../../hooks/useDogDetail";
import { useUserContext } from "../../hooks/contextHooks";
import DeleteDog from "../../components/DeleteDogModal/DeleteDogModal";

const Detail = () => {
  const params = useParams();
  const { pathname } = useLocation();
  const { User } = useUserContext();
  const {
    dog,
    isError,
    error,
    prevAndNext,
    handleFav,
    handleModify,
    isFav,
    isDogPending,
    isFavLoading,
  } = useDogDetail(Number(params?.id));
  const [isImageOpen, setIsImageOpen] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);

  const handleClick = () => {
    setIsImageOpen(!isImageOpen);
  };

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

            <div className={style.iconsContainer}>
              {!isDogPending &&
                (isFavLoading ? (
                  <div className={style.favLoader}></div>
                ) : isFav ? (
                  <div className={style.heartFillContainer} onClick={handleFav}>
                    <HeartFill className={style.heartFill} />
                  </div>
                ) : (
                  <div className={style.heartContainer} onClick={handleFav}>
                    <Heart className={style.heart} />
                  </div>
                ))}

              {(User?.id === dog?.userId || User?.admin && !isDogPending) && (
                <div
                  className={style.deleteContainer}
                  onClick={() => setOpenDelete(true)}
                >
                  <DeleteIcon />
                </div>
              )}
              {User?.id === dog?.userId && (
                <div
                  className={style.modifyContainer}
                  onClick={() => handleModify()}
                >
                  <ModifyIcon />
                </div>
              )}
            </div>

            <DogDescription
              breedGroup={dog?.breedGroup}
              height={dog?.height}
              lifeSpan={dog?.lifeSpan}
              temperaments={dog?.temperaments}
              weight={dog?.weight}
            />
          </div>

          {isImageOpen && (
            <FullSizeImage
              img={dog?.img}
              setIsImageOpen={() => {
                setIsImageOpen(false);
              }}
            />
          )}
          {openDelete && (
            <DeleteDog
              setOpenDelete={setOpenDelete}
              id={dog.id}
              isDogPending={pathname.includes("/dog-pending/")}
              isInDogDetail
            />
          )}
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
