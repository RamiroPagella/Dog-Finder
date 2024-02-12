import style from "./navBar.module.scss";
import {
  Profile,
  Heart,
  DogHouse,
  DogPaw,
  Search,
} from "../../assets/icons/navBarIcons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUserContext } from "../../hooks/contextHooks";
import SearchBar from "./SearchBar/SearchBar";

interface target extends EventTarget {
  id?: string;
}

const NavBar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { isAuthenticated } = useUserContext();

  const [showTooltip, setShowTooltip] = useState({
    createDog: false,
    explore: false,
    favorites: false,
  });
  const selectedPath = {
    createDog: pathname === "/create-dog",
    explore: pathname === "/",
    favorites: pathname === "/favorites",
  };

  const onMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const target: target = e.target;

    if (!target.id) return;

    setShowTooltip({ ...showTooltip, [target.id]: true });
  };
  const onMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const target: target = e.target;

    if (!target.id) return;

    setShowTooltip({ ...showTooltip, [target.id]: false });
  };

  return (
    <div className={style.NavBar}>
      <div className={style.Container1}>
        <div
          className={style.iconContainer}
          id="createDog"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onClick={() => navigate("/create-dog")}
        >
          <DogPaw
            className={`${style.icon} ${
              selectedPath.createDog ? style.icon_on : ""
            }`}
          />
          {showTooltip.createDog ? <p>Crear perro</p> : null}
        </div>

        <div
          className={style.iconContainer}
          id="explore"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onClick={() => navigate("/")}
        >
          <DogHouse
            className={`${style.icon} ${selectedPath.explore ? style.icon_on : ""}`}
          />
          {showTooltip.explore ? <p>Explorar</p> : null}
        </div>

        <div
          className={style.iconContainer}
          id="favorites"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onClick={() => navigate("/favorites")}
        >
          <Heart
            className={`${style.icon} ${
              selectedPath.favorites ? style.icon_on : ""
            }`}
          />
          {showTooltip.favorites ? <p>Favoritos</p> : null}
        </div>
      </div>
      
      <div className={style.Container2}>
        <SearchBar />
        <Search className={style.icon} />
      </div>

      <div className={style.Container3}>
        {isAuthenticated ? (
          <Profile className={style.icon} />
        ) : (
          <Link to='/login' className={style.button}>Iniciar sesión</Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;
