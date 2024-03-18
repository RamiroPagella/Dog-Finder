import { useEffect, useState } from "react";
import { Dog as DogType } from "../types";
import Axios from "../axios";
import { errorToast } from "../toasts";
import { useUserContext } from "./contextHooks";
import { favDog } from "../services/dogsServices";
import { useLocation } from "react-router-dom";

interface Response {
  message: "string";
  dog: DogType;
  prevAndNext: { prev: `${number}` | null; next: `${number}` | null };
}

const useDogDetail = (id: string) => {
  const { isAuthenticated, User, setUser } = useUserContext();
  const { pathname } = useLocation();
  const [dog, setDog] = useState<DogType | null>(null);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [prevAndNext, setPrevAndNext] = useState<Response['prevAndNext']>({
    prev: null,
    next: null,
  });
  const [isFavLoading, setIsFavLoading] = useState<boolean>(false);
  const [isFav, setIsFav] = useState<boolean>(false);
  const [isDogPending, setIsDogPending] = useState<boolean>(false);

  const handleFav = async () => {
    if (!isAuthenticated) {
      errorToast("Debes iniciar sesión");
      return;
    }
    if (isFavLoading) return;

    setIsFavLoading(true);
    favDog(id as string)
      .then(({ data }) => {
        setUser(data.User);
        setIsFav(data.isFav);
        setIsFavLoading(false);
      })
      .catch((err: Error) => {
        errorToast(err.message);
        setIsFavLoading(false);
        setIsFav(false);
        console.log(err);
      });
  };

  useEffect(() => {
    setIsError(false);
    setError(null);
    setDog(null);

    const controller = new AbortController();
    const { signal } = controller;

    const url = pathname.includes("/dog/")
      ? `/dog/${id}`
      : `/dog-pending/${id}`;

    Axios.get<Response>(url, { signal })
      .then((res) => {
        setDog(res.data.dog);
        console.log();
        setPrevAndNext(res.data.prevAndNext);
      })
      .catch((err) => {
        if (signal.aborted) return;
        setIsError(true);
        setError(err);
        console.log(err);
      });

    if (id) {
      const uuidPattern =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      const isUuid = uuidPattern.test(id);

      if (isUuid) {
        setIsDogPending(true);
      } else {
        if (isAuthenticated)
          User.likes?.map((dog) => {
            if (Number(dog.id) === Number(id)) setIsFav(true);
          });
      }
    }

    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return {
    dog,
    isError,
    error,
    prevAndNext,
    handleFav,
    isFav,
    isDogPending,
    isFavLoading,
  };
};

export default useDogDetail;
