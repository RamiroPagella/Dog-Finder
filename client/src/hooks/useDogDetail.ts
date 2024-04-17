import { useEffect, useState } from "react";
import { Dog as DogType } from "../types";
import Axios from "../axios";
import { errorToast } from "../toasts";
import {
  useAppContext,
  usePagingContext,
  useSearchAndFiltersContext,
  useUserContext,
} from "./contextHooks";
import { favDog, getDogs } from "../services/dogsServices";
import { useLocation, useNavigate } from "react-router-dom";

interface Response {
  message: "string";
  dog: DogType;
  prevAndNext: { prev: `${number}` | null; next: `${number}` | null };
}

const useDogDetail = (id: DogType["id"]) => {
  const { isAuthenticated, User, setUser } = useUserContext();
  const { setCreatedDog, setModifying, dogs, setDogs } = useAppContext();
  const {
    User: { likes },
  } = useUserContext();
  const { currentPage, totalPages, setTotalPages, setCurrentPage } =
    usePagingContext();
  const { searchAndFilters } = useSearchAndFiltersContext();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [dog, setDog] = useState<DogType | null>(null);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [prevAndNext, setPrevAndNext] = useState<
    Response["prevAndNext"] | { prev: boolean; next: boolean }
  >({
    prev: null,
    next: null,
  });
  const [isFavLoading, setIsFavLoading] = useState<boolean>(false);
  const [isFav, setIsFav] = useState<boolean>(false);
  const isDogPending = pathname.includes("/pending");
  const [actualIndex, setActualIndex] = useState<number | undefined>(undefined);

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
    setModifying(pathname.includes("/pending") ? "pending" : "accepted");
    navigate("/create-dog");
  };

  const prevHandler = async () => {
    const { prev } = prevAndNext;
    if (!prev) return;

    let url: string = "";
    if (pathname.includes("/dog/") && typeof actualIndex === 'number') {
      if (actualIndex <= 0) {
        setDogs([]);
        setCurrentPage(currentPage - 1);
        const newDogs = await getDogs(currentPage - 1, searchAndFilters);
        setTotalPages(newDogs.totalPages);
        setDogs(newDogs.dogs);
        url = `/dog/${newDogs.dogs[newDogs.dogs.length - 1].id}`;
      } else {
        url = `/dog/${dogs[actualIndex - 1].id}`;
      }
    } else if (pathname.includes("/favorite") && typeof actualIndex === 'number')
      url = `/favorite/${likes[actualIndex - 1].id}`;
    else if (pathname.includes("/my-dog/")) url = `/my-dog/${prev}`;
    else if (pathname.includes("/my-dog/pending/"))
      url = `/my-dog/pending/${prev}`;
    else if (pathname.includes("/pending-dog/")) url = `/pending-dog/${prev}`;

    navigate(url);
  };

  const nextHandler = async () => {
    const { next } = prevAndNext;
    if (!next) return;


    let url: string = "";
    if (pathname.includes("/dog/") && typeof actualIndex === "number") {
      if (actualIndex >= dogs.length - 1) {
        setDogs([]);
        setCurrentPage(currentPage + 1);
        const newDogs = await getDogs(currentPage + 1, searchAndFilters);
        setTotalPages(newDogs.totalPages);
        setDogs(newDogs.dogs);
        url = `/dog/${newDogs.dogs[0].id}`;
      } else {
        url = `/dog/${dogs[actualIndex + 1].id}`;
      }
    } else if (pathname.includes("/favorite") && typeof actualIndex === 'number')
      url = `/favorite/${likes[actualIndex + 1].id}`;
    else if (pathname.includes("/my-dog/")) url = `/my-dog/${next}`;
    else if (pathname.includes("/my-dog/pending/"))
      url = `/my-dog/pending/${next}`;
    else if (pathname.includes("/pending-dog/")) url = `/pending-dog/${next}`;

    navigate(url);
  };

  useEffect(() => {
    setIsError(false);
    setError(null);
    setDog(null);

    const controller = new AbortController();
    const { signal } = controller;

    let backendUrl: string = "";

    if (pathname.includes("/dog/")) {
      const dogActualIndex = dogs.findIndex((dog) => dog.id === id);
      setActualIndex(dogActualIndex);
      dogActualIndex >= 0 && setDog(dogs[dogActualIndex]);

      setPrevAndNext({
        prev: currentPage > 1 || dogActualIndex > 0,
        next: currentPage < totalPages || dogActualIndex < dogs.length - 1,
      });
    } else if (pathname.includes("/favorite/")) {
      const dogActualIndex = likes.findIndex((dog) => dog.id === id);
      setActualIndex(dogActualIndex);
      setDog(likes[dogActualIndex]);

      setPrevAndNext({
        prev: dogActualIndex > 0,
        next: dogActualIndex < likes.length - 1,
      });
    } else if (pathname.includes("/my-dog/")) {
      if (pathname.includes("/pending")) backendUrl = `/pending-dog/own/${id}`;
      else backendUrl = `/own-dog/${id}`;
    } else if (pathname.includes("/pending-dog")) {
      backendUrl = `/pending-dog/${id}`;
    }

    if (backendUrl !== "") {
      console.log(backendUrl);
      Axios.get<Response>(backendUrl, {
        signal,
        params: { sort: searchAndFilters.sort },
      })
        .then((res) => {
          setDog(res.data.dog);
          setPrevAndNext(res.data.prevAndNext);
        })
        .catch((err) => {
          if (signal.aborted) return;
          setIsError(true);
          setError(err);
          console.log(err);
        });
    }

    if (isAuthenticated && !isDogPending) {
      let isFav: boolean = false;
      User.likes?.map((dog) => {
        if (Number(dog.id) === Number(id)) isFav = true;
      });
      setIsFav(isFav);
    }

    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, dogs]);

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
    prevHandler,
    nextHandler,
  };
};

export default useDogDetail;
