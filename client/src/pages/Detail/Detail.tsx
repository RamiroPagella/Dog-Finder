import style from "./detail.module.scss";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "../../axios";
import { Dog as DogType } from "../../types";
import FullSizeImage from "../../components/DetailComponents/FullSizeImage/FullSizeImage";
import DogDescription from "../../components/DetailComponents/DogDescription/DogDescription";
import { Oval } from "react-loader-spinner";

const Detail = () => {
  const { id } = useParams();
  const [dog, setDog] = useState<DogType>();
  const [isImageOpen, setIsImageOpen] = useState<boolean>(false);

  useEffect(() => {
    Axios.get(`/dogs/${id}`).then((res) => {
      setDog(res.data.dog);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = () => {
    setIsImageOpen(!isImageOpen);
  };

  

  return (
    <div className={style.Detail}>
      <div className={style.description}>
        <h1>{dog?.name}</h1>
      </div>

      {dog ? (
        <div className={style.content}>
          <div className={style.imageContainer} onClick={handleClick}>
            <img src={dog?.img} />
          </div>

          <DogDescription
            breedGroup={dog.breedGroup}
            height={dog.height}
            lifeSpan={dog.lifeSpan}
            temperaments={dog.temperaments}
            weight={dog.weight}
          />
        </div>
      ) : (
        <div className={style.loaderContainer}>
          <Oval />
        </div>
      )}

      {isImageOpen ? (
        <FullSizeImage
          img={dog?.img}
          setIsImageOpen={() => {
            setIsImageOpen(false);
          }}
        />
      ) : null}
    </div>
  );
};

export default Detail;
