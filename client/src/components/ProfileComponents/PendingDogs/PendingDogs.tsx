import style from "./pendingDogs.module.scss";
import { Loader } from "../../../assets/icons";
import usePendingDogs from "../../../hooks/usePendingDogs";
import PendingDogCard from "../PendingDogCard/PendingDogCard";

const PendingDogs = () => {
  const { isLoading, isError, error, data, approveOrDisapprove, approveOrDisapproveAll } =
    usePendingDogs();
    
  return (
    <div className={style.PendingDogs}>
      <section className={style.buttons}>
        <button onClick={() => approveOrDisapproveAll(true)}>Aprobar todos</button>

        <button onClick={() => approveOrDisapproveAll(false)}>Desaprobar todos</button>
      </section>

      <section className={style.cards}>
        {isLoading && <Loader />}
        {isError ? (
          <p>{error?.message}</p>
        ) : (
          data.length ? (
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
          ) : <p>No hay perros pendientes</p>



        )}
      </section>
    </div>
  );
};

export default PendingDogs;
