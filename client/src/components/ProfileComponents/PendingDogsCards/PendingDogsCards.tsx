import style from "./pendingDogsCards.module.scss";
import { Loader } from "../../../assets/icons";
import usePendingDogs from "../../../hooks/usePendingDogs";
import PendingDogCard from "../PendingDogCard/PendingDogCard";
import { useEffect } from "react";
import { Dog } from "../../../types";
import { AxiosError } from "axios";

interface Props {
  data: Dog[];
  isLoading: boolean;
  isError: boolean;
  error: AxiosError | null;
  approveOrDisapprove: (dogId: number, approve: boolean) => void;
}

const PendingDogCards = ({
  data,
  isLoading,
  isError,
  error,
  approveOrDisapprove,
}: Props) => {
  
  useEffect(() => {
    console.log(data.length ? "hay data" : "no hay data");
    console.log("cambio detectado en data", data);
  }, [data]);

  return (
    <div className={style.PendingDogCards}>
      {isLoading && <Loader />}
      {!isLoading &&
        !isError &&
        (data.length ? (
          data.map((dog) => (
            <PendingDogCard
              approveOrDisapprove={approveOrDisapprove}
              key={dog.id}
              id={dog.id}
              img={dog.img}
              name={dog.name}
              breedGroup={dog.breedGroup}
            />
          ))
        ) : (
          <p>No hay perros pendientes</p>
        ))}
      {isError && <p>{error?.message}</p>}
    </div>
  );
};

export default PendingDogCards;
