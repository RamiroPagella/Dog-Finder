import style from "./pendingDogs.module.scss";
import { Loader } from "../../../assets/icons";
import usePendingDogs from "../../../hooks/usePendingDogs";
import PendingDogCard from "../PendingDogCard/PendingDogCard";

const PendingDogs = () => {
  const { isLoading, isError, error, data, handleApprove, handleDisapprove } =
    usePendingDogs();

  return (
    <div className={style.PendingDogs}>
      <section className={style.buttons}>
        <button>Aprobar todos</button>

        <button>Desaprobar todos</button>
      </section>

      <section className={style.cards}>
        {isLoading && <Loader />}
        {isError ? (
          <p>{error?.message}</p>
        ) : (
          data.map((dog) => (
            <PendingDogCard
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
      </section>
    </div>
  );
};

export default PendingDogs;