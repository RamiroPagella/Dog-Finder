import { useState, useEffect } from "react";
import { DogType } from "../types";
import { getDogs } from "../services/dogsServices";
import { usePagingContext } from "./contextHooks";

const useDogs = (currentPage = 1) => {
  const [dogs, setDogs] = useState<DogType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);

  const {setTotalPages} = usePagingContext();

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    setError(null);

    const controller = new AbortController();
    const { signal } = controller;

    getDogs(currentPage, { signal })
      .then((data) => {
        setDogs(data.dogs);
        setIsLoading(false);
        setHasNextPage(currentPage <= data.totalPages);
        setTotalPages(data.totalPages)
      })
      .catch((err) => {
        setIsLoading(false);
        if (signal.aborted) return;
        setIsError(true);
        setError(err);
        console.log(err)
      });

    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  return { dogs, isLoading, isError, error, hasNextPage };
};

export default useDogs;
