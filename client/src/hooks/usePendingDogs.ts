import { useState, useEffect } from "react";
import { Dog } from "../types";
import { AxiosError } from "axios";
import Axios from "../axios";
import toast from "react-hot-toast";

const usePendingDogs = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError | null>(null);
  const [data, setData] = useState<Dog[]>([]);

  useEffect(() => {
    setIsLoading(true);
    Axios("/dogs/pending")
      .then((res) => {
        setData(res.data);
        console.log(res);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setIsError(true);
        setError(err);
      });
  }, []);

  const handleApprove = async (dogId: string) => {
    try {
      await Axios.put(`/dog/pending/`, { id: dogId, isApproved: true });
      setData(data.filter((dog) => dog.id !== dogId));
    } catch (error) {
      toast.error(error instanceof AxiosError ? error.message : "Error", {
        style: {
          backgroundColor: "var(--color7)",
          color: "var(--color4)",
          userSelect: "none",
        },
      });
      console.log(error);
    }
  };
  const handleDisapprove = async (dogId: string) => {
    try {
      await Axios.put(`/dog/pending`, { id: dogId, isApproved: false });
      setData(data.filter((dog) => dog.id !== dogId));
    } catch (error) {
      toast.error(error instanceof AxiosError ? error.message : "Error", {
        style: {
          backgroundColor: "var(--color7)",
          color: "var(--color4)",
          userSelect: "none",
        },
      });
      console.log(error);
    }
  };

  return {
    isLoading,
    isError,
    error,
    data,
    handleApprove,
    handleDisapprove,
  };
};

export default usePendingDogs;
