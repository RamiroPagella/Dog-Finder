import { useState, useEffect } from "react";
import { getDogs } from "../services/dogsServices";
import { useAppContext, usePagingContext, useSearcAndfiltersContext } from "./contextHooks";

const useDogs = () => {
  const { setTotalPages, currentPage } = usePagingContext();
  const { searchAndFilters } = useSearcAndfiltersContext();
  const { dogs, setDogs } = useAppContext();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    setError(null);

    const controller = new AbortController();
    const { signal } = controller;


    getDogs(currentPage, searchAndFilters, { signal })
      .then((data) => {
        setDogs(data.dogs);
        setIsLoading(false);
        setTotalPages(data.totalPages);
        console.log(data);
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
  }, [currentPage, searchAndFilters]);

  return { dogs, isLoading, isError, error };
};

export default useDogs;
