import style from "./detailHeader.module.scss";
import { Dog as DogType, User } from "../../../types";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../../../hooks/contextHooks";

interface Props {
  dogName: DogType["name"] | undefined;
  prevAndNext:
    | { prev: `${number}` | null; next: `${number}` | null }
    | { prev: boolean; next: boolean };
  username: User["username"] | undefined;
  prevHandler: () => void;
  nextHandler: () => void;
}

const DetailHeader = ({
  username,
  dogName,
  prevAndNext,
  prevHandler,
  nextHandler,
}: Props) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { backRoute, setBackRoute } = useAppContext();

  return (
    <div className={style.DetailHeader}>
      <div className={style.title}>
        <h1>{`${dogName} `}</h1>
        {username && (
          <h1>{`${`(Creado por: ${username})`} ${pathname.includes("/pending-dog") ? " | pendiente" : ""}`}</h1>
        )}
      </div>
      <div className={style.buttons}>
        <button
          onClick={() => {
            navigate(backRoute);
            setBackRoute("");
          }}
        >
          Volver
        </button>

        <p style={{height: '100%'}}>|</p>

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
