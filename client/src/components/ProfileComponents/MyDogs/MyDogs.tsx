import style from "./myDogs.module.scss";
import { Link, useLocation } from "react-router-dom";
import MyDogsCards from "../MyDogsCards/MyDogsCards";

const MyDogs = () => {
  const { pathname } = useLocation();

  return (
    <div className={style.MyDogs}>
      <section className={style.buttons}>
        <Link
          to={"/profile/my-dogs/accepted"}
          className={pathname.includes("/accepted") ? style.selectedBtn : ""}
        >
          Aprobados
        </Link>
        <Link
          to={"/profile/my-dogs/pending"}
          className={pathname.includes("/pending") ? style.selectedBtn : ""}
        >
          Pendientes
        </Link>
      </section>

      <MyDogsCards />
    </div>
  );
};

export default MyDogs;
