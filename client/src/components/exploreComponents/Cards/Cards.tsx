import style from "./cards.module.scss";
import Card from "../Card/Card";
import useDogs from "../../../hooks/useDogs";
import { Dog as DogType } from "../../../types";
import { usePagingContext } from "../../../hooks/contextHooks";
import { Loader } from "../../../assets/icons";

const Cards = () => {
  const { currentPage } = usePagingContext();
  const { dogs, isLoading, isError, error } = useDogs(currentPage);


  return (
    <div className={style.Cards}>
      {
        isError ? error?.message : 
      (isLoading ? (
        <div className={style.loaderContainer}>
          <Loader />
        </div>
      ) : (
        dogs?.map((dog: DogType) => (
          <Card
            key={dog.id}
            id={dog.id}
            breedGroup={dog.breedGroup}
            height={dog.height}
            img={dog.img}
            lifeSpan={dog.lifeSpan}
            name={dog.name}
            temperaments={dog.temperaments}
            weight={dog.weight}
          />
        ))
      ))
      }
    </div>
  );
};

export default Cards;
