import { useState, useEffect } from "react";
import { DogType } from "../types";
import { getDogs } from "../services/dogsServices";

const useDogs = (pageNum = 1) => {
  const [dogs, setDogs] = useState<DogType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<unknown>();
  const [hasNextPage, setHasNextPage] = useState<boolean>();

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    setError({});

    const controller = new AbortController();
    const { signal } = controller;

    getDogs(pageNum, { signal })
      .then((data) => {
        setDogs([...dogs, ...data.dogs]);
        setIsLoading(false);
        setHasNextPage(data.hasNextPage);
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
  }, [pageNum]);

  return { dogs, isLoading, isError, error, hasNextPage };
};

export default useDogs;
