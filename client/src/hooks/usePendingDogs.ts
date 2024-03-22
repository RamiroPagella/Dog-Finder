import { useState, useEffect } from "react";
import { Dog } from "../types";
import { AxiosError } from "axios";
import Axios from "../axios";
import toast from "react-hot-toast";
import { usePagingContext, useSearcAndfiltersContext } from "./contextHooks";

interface Response {
  dogs: Dog[];
  totalPages: number;
}

const usePendingDogs = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError | null>(null);
  const [data, setData] = useState<Dog[]>([]);

  const { pendingsCurrentPage, setPendingsTotalPages } = usePagingContext();
  const { pendingDogsSearch } = useSearcAndfiltersContext();

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    setError(null);

    Axios<Response>(`/dogs/pending?page=${pendingsCurrentPage}&search=${pendingDogsSearch}`)
      .then(({ data }) => {
        const { dogs, totalPages } = data;
        setData(dogs.sort((a, b) => (Number(a.id) > Number(b.id) ? 1 : -1)));
        setPendingsTotalPages(totalPages);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setIsError(true);
        setError(err);
        console.log(err);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingsCurrentPage, pendingDogsSearch]);

  const approveOrDisapprove = (dogId: Dog["id"], approve: boolean) => {
    const asyncFunction = async () => {
      const response = await Axios.put("/pending-dog", {
        id: dogId,
        approve,
      });
      setData(data.filter((dog) => dog.id !== dogId));
      console.log("la response", response);
      return response;
    };

    toast.promise(asyncFunction(), {
      loading: `${approve ? "Aprobando" : "Desaprobando"} perro...`,
      success: () => `Perro ${approve ? "aprobado" : "desaprobado"} con exito`,
      error: (err) => {
        return err instanceof AxiosError ? err.message : "Error";
      },
    });
  };

  const approveOrDisapproveAll = (approve: boolean) => {
    const dogIds: Array<Dog["id"]> = data.map((dog) => dog.id);
    const asyncFunction = async () => {
      const response = await Axios.put("/pending-dog/all", {
        ids: dogIds,
        approve,
      });
      setData([]);
      return response;
    };

    toast.promise(asyncFunction(), {
      loading: `${approve ? "Aprobando" : "Desaprobando"} perros...`,
      success: () =>
        `Perros ${approve ? "aprobados" : "desaprobados"} con exito`,
      error: (err) => {
        return err instanceof AxiosError ? err.message : "Error";
      },
    });
  };

  return {
    isLoading,
    isError,
    error,
    data,
    approveOrDisapprove,
    approveOrDisapproveAll,
  };
};

export default usePendingDogs;
