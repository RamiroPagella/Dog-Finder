import { useCallback, useRef, useState } from "react";
import style from "./cards.module.scss";
import Card from "../Card/Card";
import useDogs from "../../../hooks/useDogs";
import { DogType } from "../../../types";
import { Oval } from "react-loader-spinner";

const Cards = () => {
  const [pageNum, setPageNum] = useState<number>(1);
  const { dogs, isLoading, isError, error, hasNextPage } = useDogs(pageNum);

  const intObserver = useRef<IntersectionObserver | null>();

  const lastPostRef = useCallback(
    (post: HTMLDivElement) => {
      if (isLoading) return;
      if (intObserver.current) intObserver.current.disconnect();

      intObserver.current = new IntersectionObserver((entry) => {
        if (entry[0].isIntersecting && hasNextPage)
          setPageNum((prev) => prev + 1);
      });

      if (post) intObserver.current.observe(post);

      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [isLoading, hasNextPage]
  );

  return (
    <div className={style.Cards}>
      {dogs?.map((dog: DogType, i) => {
        return i === dogs.length - 1 ? (
          <Card
            ref={lastPostRef}
            id={dog.id}
            breedGroup={dog.breedGroup}
            height={dog.height}
            img={dog.img}
            lifeSpan={dog.lifeSpan}
            name={dog.name}
            temperaments={dog.temperaments}
            weight={dog.weight}
          />
        ) : (
          <Card
            id={dog.id}
            breedGroup={dog.breedGroup}
            height={dog.height}
            img={dog.img}
            lifeSpan={dog.lifeSpan}
            name={dog.name}
            temperaments={dog.temperaments}
            weight={dog.weight}
          />
        );
      })}

      {isLoading && 
        <div className={style.loaderContainer}>
          <Oval height="80" width="80" color="#495057" />
        </div> }
    </div>
  );
};

export default Cards;
