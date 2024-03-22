import style from "./pendingDogsCards.module.scss";
import { Loader } from "../../../assets/icons";
import usePendingDogs from "../../../hooks/usePendingDogs";
import PendingDogCard from "../PendingDogCard/PendingDogCard";

const PendingDogCards = () => {
  const { isLoading, isError, error, data, approveOrDisapprove } =
    usePendingDogs();

  return (
    <div className={style.PendingDogCards}>
      {isLoading && <Loader />}
      {!isLoading &&
        !isError &&
        (data.length ? (
          data.map((dog) => (
            <PendingDogCard
              user={dog.user}
              userId={dog.userId}
              approveOrDisapprove={approveOrDisapprove}
              key={dog.id}
              id={dog.id}
              img={dog.img}
              name={dog.name}
              height={dog.height}
              weight={dog.weight}
              lifeSpan={dog.lifeSpan}
              temperaments={dog.temperaments}
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

{
  /* <div className={style.PendingDogCards}>
      {isLoading && <Loader />}
      {!isLoading && !isError && data.length === 0 && (
        <p>No hay perros pendientes</p>
      )}
      {isError ? (
        <p>{error?.message}</p>
      ) : (
        data.map((dog) => (
          <PendingDogCard
            user={dog.user}
            userId={dog.userId}
            approveOrDisapprove={approveOrDisapprove}
            key={dog.id}
            id={dog.id}
            img={dog.img}
            name={dog.name}
            height={dog.height}
            weight={dog.weight}
            lifeSpan={dog.lifeSpan}
            temperaments={dog.temperaments}
            breedGroup={dog.breedGroup}
          />
        ))
      )}
    </div> */
}
