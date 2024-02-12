import style from "./detailHeader.module.scss";
import { Dog as DogType } from "../../../types";
import { useNavigate } from "react-router-dom";

interface Props {
  name: DogType["name"] | undefined;
  id: DogType["id"] | undefined;
  hasNextAndPrev: {prev: boolean; next: boolean};
}

const DetailHeader = ({ name, id, hasNextAndPrev }: Props) => {
  const navigate = useNavigate();

  const prevHandler = () => {
    if (!hasNextAndPrev.prev) return;
    navigate(`/dog/${Number(id) - 1}`);
  };
  const nextHandler = () => {
    if (!hasNextAndPrev.next) return;
    navigate(`/dog/${Number(id) + 1}`)
  };

  return (
    <div className={style.pageHeader}>
      <h1>{name}</h1>
      <div className={style.headerButtons}>
        <button onClick={prevHandler}>Anterior</button>

        <button onClick={nextHandler}>Siguiente</button>
      </div>
    </div>
  );
};

export default DetailHeader;
