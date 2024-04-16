import style from "./pendingDogs.module.scss";
import usePendingDogs from "../../../hooks/usePendingDogs";
import PendingDogsPaging from "../PendingDogsPaging/PendingDogsPagination";
import PendingDogCards from "../PendingDogsCards/PendingDogsCards";
import { useEffect } from "react";
import { GetUserInfo } from "../../../services/userServices";
import { useUserContext } from "../../../hooks/contextHooks";

const PendingDogs = () => {
  const {
    approveOrDisapproveAll,
    data,
    isLoading,
    isError,
    approveOrDisapprove,
    error,
  } = usePendingDogs();
  const { setIsAuthenticated, setUser } = useUserContext();

  useEffect(() => {
    GetUserInfo({ setIsAuthenticated, setUser });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

      <PendingDogCards
        data={data}
        isLoading={isLoading}
        isError={isError}
        error={error}
        approveOrDisapprove={approveOrDisapprove}
      />

      <PendingDogsPaging />

    </div>
  );
};

export default PendingDogs;
