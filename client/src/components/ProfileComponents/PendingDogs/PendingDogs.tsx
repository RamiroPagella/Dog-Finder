import style from "./pendingDogs.module.scss";
import usePendingDogs from "../../../hooks/usePendingDogs";
import PendingDogsPaging from "../PendingDogsPaging/PendingDogsPagination";
import PendingDogCards from "../PendingDogsCards/PendingDogsCards";

const PendingDogs = () => {
  const {
    approveOrDisapproveAll,
  } = usePendingDogs();

  return (
    <div className={style.PendingDogs}>
      <section className={style.buttons}>
        <button onClick={() => approveOrDisapproveAll(true)}>
          Aprobar todos
        </button>

        <button onClick={() => approveOrDisapproveAll(false)}>
          Desaprobar todos
        </button>
      </section>

      <PendingDogCards />

      <PendingDogsPaging />
    </div>
  );
};

export default PendingDogs;
