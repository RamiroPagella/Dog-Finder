import style from "./detailHeader.module.scss";
import { Dog as DogType, User } from "../../../types";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../../../hooks/contextHooks";

interface Props {
  dogName: DogType["name"] | undefined;
  prevAndNext: { prev: `${number}` | null; next: `${number}` | null };
  username: User["username"] | undefined;
}

const DetailHeader = ({ username, dogName, prevAndNext }: Props) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { backRoute, setBackRoute } = useAppContext();

  const prevHandler = () => {
    if (!prevAndNext.prev) return;
    navigate(
      pathname.includes("/dog/")
        ? `/dog/${prevAndNext.prev}`
        : `/pending-dog/${prevAndNext.prev}`,
    );
  };
  const nextHandler = () => {
    if (!prevAndNext.next) return;
    navigate(
      pathname.includes("/dog/")
        ? `/dog/${prevAndNext.next}`
        : `/pending-dog/${prevAndNext.next}`,
    );
  };

  return (
    <div className={style.pageHeader}>
      <h1>{`${dogName} `}</h1>
      <h1>{`${username ? `(Creado por: ${username})` : ""} ${pathname.includes("/pending-dog") ? " | pendiente" : ""}`}</h1>
      <div className={style.buttons}>
        <div className={style.backButton}>
          <button
            onClick={() => {
              navigate(backRoute);
              setBackRoute("");
            }}
          >
            Volver
          </button>
        </div>
        <button
          onClick={prevHandler}
          className={!prevAndNext.prev ? style.btnDisabled : ""}
        >
          Anterior
        </button>

        <button
          onClick={nextHandler}
          className={!prevAndNext.next ? style.btnDisabled : ""}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default DetailHeader;
