import style from "./cards.module.scss";
import Card from "../Card/Card";
import useDogs from "../../../hooks/useDogs";
import { Dog as DogType } from "../../../types";
import { Oval } from "react-loader-spinner";
import { usePagingContext } from "../../../hooks/contextHooks";

const Cards = () => {
  const { currentPage } = usePagingContext();
  const { dogs, isLoading, isError, error } = useDogs(currentPage);

  return (
    <div className={style.Cards}>
      {
        isError ? error?.message : 
      (isLoading ? (
        <div className={style.loaderContainer}>
          <Oval height="80" width="80" color="#495057" />
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
