import { useState, useEffect } from "react";
import { Dog } from "../types";
import { AxiosError, AxiosResponse } from "axios";
import Axios from "../axios";
import { errorToast } from "../toasts";
import toast from "react-hot-toast";

const usePendingDogs = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError | null>(null);
  const [data, setData] = useState<Dog[]>([]);

  useEffect(() => {
    setIsLoading(true);
    Axios("/dogs/pending")
      .then(({ data }) => {
        const dogs = data as Dog[];
        setData(dogs.sort((a, b) => (Number(a.id) > Number(b.id) ? 1 : -1)));
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setIsError(true);
        setError(err);
      });
  }, []);

  const handleApproveOrDisapprove = (dogId: string, approve: boolean) => {
    const asyncFunction = async () => {
      const response = await Axios.put<string>("/dog-pending", {
        id: dogId,
        isApproved: approve,
      });
      setData(data.filter((dog) => dog.id !== dogId));
      console.log("la response", response);
      return response;
    };

    toast.promise(asyncFunction(), {
      loading: `${approve ? "Aprobando" : "Desaprobando"} perro...`,
      success: () => `Perro ${approve ? "aprobado" : "desaprobado"} con exito`,
      error: (err) => {
        console.log('el error del toastPromise',err);
        return err instanceof AxiosError ? err.message : "Error";
      },
    });
  };

  return {
    isLoading,
    isError,
    error,
    data,
    handleApproveOrDisapprove,
  };
};

export default usePendingDogs;
