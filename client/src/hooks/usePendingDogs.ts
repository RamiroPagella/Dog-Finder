import { useState, useEffect } from "react";
import { Dog } from "../types";
import { AxiosError } from "axios";
import Axios from "../axios";

const usePendingDogs = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError | null>(null);
  const [data, setData] = useState<Dog[]>([]);

  useEffect(() => {
    setIsLoading(true);
    Axios("/dogs/pending")
      .then((res) => {
        setData(res.data)
        console.log(res);
        setIsLoading(false)
      })
      .catch((err) => {
        setIsLoading(false)
        setIsError(true);
        setError(err);
      });
  }, []);

  const handleApprove = async (id: string) => {
    try {
      const response = await Axios.post(`/dog/pending/${id}`);
      
      
    } catch (error) {
      
    }
  }
  const handleDisapprove = async (id: string) => {

  }

  return {
    isLoading,
    isError,
    error,
    data,
    handleApprove,
    handleDisapprove
  };
};

export default usePendingDogs;
