import { useEffect, useState } from "react";
import { CreatedDog, Dog as DogType } from "../types";
import Axios from "../axios";
import { errorToast } from "../toasts";
import { useAppContext, useUserContext } from "./contextHooks";
import { favDog } from "../services/dogsServices";
import { useLocation, useNavigate } from "react-router-dom";

interface Response {
  message: "string";
  dog: DogType;
  prevAndNext: { prev: `${number}` | null; next: `${number}` | null };
}

const useDogDetail = (id: DogType["id"]) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, User, setUser } = useUserContext();
  const { setCreatedDog, setModifying } = useAppContext();
  const [dog, setDog] = useState<DogType | null>(null);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [prevAndNext, setPrevAndNext] = useState<Response["prevAndNext"]>({
    prev: null,
    next: null,
  });
  const [isFavLoading, setIsFavLoading] = useState<boolean>(false);
  const [isFav, setIsFav] = useState<boolean>(false);
  const isDogPending = pathname.includes("/pending-dog/") ? true : false;


  const handleFav = async () => {
    if (!isAuthenticated) {
      errorToast("Debes iniciar sesión");
      return;
    }
    if (isFavLoading) return;

    setIsFavLoading(true);
    favDog(id)
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

  const handleModify = () => {
    console.log(dog);
    if (dog) {
      setCreatedDog({ ...dog, lifeSpan: dog.lifeSpan.slice(0, -6) });
    }
    setModifying(isDogPending ? 'pending' : 'accepted');
    navigate("/create-dog");
  };

  useEffect(() => {
    setIsError(false);
    setError(null);
    setDog(null);

    const controller = new AbortController();
    const { signal } = controller;

    const url = isDogPending ? `/pending-dog/${id}` : `/dog/${id}`;

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

    if (isAuthenticated && !isDogPending)
      User.likes?.map((dog) => {
        if (Number(dog.id) === Number(id)) setIsFav(true);
      });

    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return {
    dog,
    isError,
    error,
    prevAndNext,
    handleFav,
    handleModify,
    isFav,
    isDogPending,
    isFavLoading,
  };
};

export default useDogDetail;
