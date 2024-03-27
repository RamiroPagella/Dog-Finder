import style from "./pendingDogsCards.module.scss";
import { Loader } from "../../../assets/icons";
import usePendingDogs from "../../../hooks/usePendingDogs";
import PendingDogCard from "../PendingDogCard/PendingDogCard";
import { useEffect } from "react";

const PendingDogCards = () => {
  const { data, isLoading, isError, approveOrDisapprove, error, resfresh } =
    usePendingDogs();

  //arregar el bug este de que no se actualiza la variable data
  useEffect(() => {
    console.log(data.length ? "hay data" : "no hay data");
    console.log("pendingDogCards", data);
  }, [data]);

  useEffect(() => {
    console.log("se detecto el refresh", resfresh);
  }, [resfresh]);

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
