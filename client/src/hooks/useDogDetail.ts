import { useEffect, useState } from "react";
import { Dog as DogType } from "../types";
import Axios from "../axios";

interface Response {
  message: "string";
  dog: DogType;
  hasPrevAndNext: { prev: boolean; next: boolean };
}

const useDogDetail = (id: string) => {
  const [dog, setDog] = useState<DogType | null>(null);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [hasNextAndPrev, setHasNextAndPrev] = useState({
    prev: false,
    next: false,
  });

  useEffect(() => {
    setIsError(false);
    setError(null);
    setHasNextAndPrev({ prev: false, next: false });
    setDog(null)

    const controller = new AbortController();
    const { signal } = controller;
    
    const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    const isUuid = uuidPattern.test(id);
    const url = isUuid ? `/dog/pending/${id}` : `/dog/${id}`;

    Axios.get<Response>(url, { signal })
      .then((res) => {
        setDog(res.data.dog);
        console.log()
        setHasNextAndPrev(res.data.hasPrevAndNext);
      })
      .catch((err) => {
        if (signal.aborted) return;
        setIsError(true);
        setError(err);
        console.log(err);
      });

    return () => controller.abort();
  }, [id]);

  return { dog, isError, error, hasNextAndPrev}
};

export default useDogDetail;
