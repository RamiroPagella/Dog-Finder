import { useEffect, useState } from "react";
import {
  usePagingContext,
  useSearchAndFiltersContext,
  useUserContext,
} from "../../../hooks/contextHooks";
import { Dog } from "../../../types";
import Card from "../../Card/Card";
import style from "./favCards.module.scss";

const FavCards = () => {
  const {
    User: { likes },
  } = useUserContext();
  const { favCurrentPage, setFavTotalPages } = usePagingContext();
  const { favSearch } = useSearchAndFiltersContext();
  const [actualSlice, setActualSlice] = useState<Dog[]>([]);
  const pageLength = 8;

  const paginateArray = (
    array: Dog[],
    pageSize: number,
    actualPage: number,
    search: string,
  ): Dog[] => {
    if (pageSize <= 0 || actualPage <= 0) return [];

    setFavTotalPages(Math.ceil(array.length / pageSize));

    const startIndex = (actualPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    let paginatedArray = array.slice(startIndex, endIndex);

    if (search !== "")
      paginatedArray = paginatedArray.filter((dog) => {
        dog.name.toLowerCase().includes(search.trim().toLowerCase());
      });

    return paginatedArray;
  };

  useEffect(() => {
    setActualSlice(paginateArray(likes, pageLength, favCurrentPage, favSearch));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favCurrentPage, likes, favSearch]);

  return (
    <div className={style.FavCards}>
      {actualSlice?.length ? (
        actualSlice.map((dog) => (
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
      ) : (
        <p className={style.text}>No hay perros en favoritos</p>
      )}
    </div>
  );
};

export default FavCards;
