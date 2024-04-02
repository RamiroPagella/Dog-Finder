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
    const { prev } = prevAndNext;
    if (!prev) return;

    let url: string = "";
    if (pathname.includes("/dog/")) url = `/dog/${prev}`;
    if (pathname.includes("/my-dog/")) url = `/my-dog/${prev}`;
    if (pathname.includes("/my-dog/pending/")) url = `/my-dog/pending/${prev}`;
    if (pathname.includes("/pending-dog/")) url = `/pending-dog/${prev}`;

    navigate(url);
  };
  const nextHandler = () => {
    const { next } = prevAndNext;
    if (!next) return;

    let url: string = "";
    if (pathname.includes("/dog/")) url = `/dog/${next}`;
    if (pathname.includes("/my-dog/")) url = `/my-dog/${next}`;
    if (pathname.includes("/my-dog/pending/")) url = `/my-dog/pending/${next}`;
    if (pathname.includes("/pending-dog/")) url = `/pending-dog/${next}`;

    navigate(url);
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
