import style from "./detailHeader.module.scss";
import { Dog as DogType } from "../../../types";
import { useLocation, useNavigate } from "react-router-dom";

interface Props {
  name: DogType["name"] | undefined;
  prevAndNext: { prev: `${number}` | null; next: `${number}` | null };
}

const DetailHeader = ({ name, prevAndNext }: Props) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

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
      <h1>{name}</h1>
      <div className={style.headerButtons}>
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
