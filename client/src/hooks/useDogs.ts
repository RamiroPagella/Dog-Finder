import { useState, useEffect } from "react";
import { Dog as DogType } from "../types";
import { getDogs } from "../services/dogsServices";
import { usePagingContext, useSearcAndfiltersContext } from "./contextHooks";

const useDogs = (currentPage = 1) => {
  const [dogs, setDogs] = useState<DogType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);

  const { setTotalPages } = usePagingContext();
  const { search, weight, height, temperaments, breedGroup, lifeSpan } =
    useSearcAndfiltersContext();
  const filters = {
    search,
    weight,
    height,
    temperaments,
    breedGroup,
    lifeSpan,
  };

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    setError(null);

    const controller = new AbortController();
    const { signal } = controller;

    getDogs(currentPage, filters, { signal })
      .then((data) => {
        setDogs(data.dogs);
        setIsLoading(false);
        setHasNextPage(currentPage <= data.totalPages);
        setTotalPages(data.totalPages);
      })
      .catch((err) => {
        setIsLoading(false);
        if (signal.aborted) return;
        setIsError(true);
        setError(err);
        console.log(err);
      });

    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, search, weight, height, temperaments, breedGroup, lifeSpan]);

  return { dogs, isLoading, isError, error, hasNextPage };
};

export default useDogs;
