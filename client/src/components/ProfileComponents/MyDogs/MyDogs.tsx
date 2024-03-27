import style from "./myDogs.module.scss";
import { Link, useLocation } from "react-router-dom";
import MyDogsCards from "../MyDogsCards/MyDogsCards";
import { RefreshIcon } from "../../../assets/icons";
import { useState } from "react";
import { useUserContext } from "../../../hooks/contextHooks";
import { GetUserInfo } from "../../../services/userServices";

const MyDogs = () => {
  const { pathname } = useLocation();
  const [toggleAnimation, setToggleAnimation] = useState<boolean>(false);
  const { setIsAuthenticated, setUser } = useUserContext();

  const handleRefresh = () => {
    setToggleAnimation(true);
    setTimeout(() => {setToggleAnimation(false)}, 300);
    GetUserInfo({ setIsAuthenticated, setUser });
  };

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
        <RefreshIcon
          onClick={() => handleRefresh()}
          className={toggleAnimation ? style.animation : ""}
        />
      </section>

      <MyDogsCards />
    </div>
  );
};

export default MyDogs;
