import style from "./navBar.module.scss";
import {
  Profile,
  Heart,
  DogHouse,
  DogPaw,
  Search,
} from "../../icons/navBarIcons";
import { useLocation, useNavigate } from "react-router-dom";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";

const NavBar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const selectedPath = {
    createDog: pathname === "/create-dog",
    home: pathname === "/",
    favorites: pathname === "/favorites",
  };

  return (
    <div className={style.NavBar}>
      <div className={style.Container1}>
        <DogPaw
          className={`${style.icon} ${
            selectedPath.createDog ? style.selected : ""
          }`}
          onClick={() => navigate("/create-dog")}
          data-tooltip-id="create-dog"
          data-tooltip-content="Crear perro"
        />
        <Tooltip id="create-dog" />

        <DogHouse
          className={`${style.icon} ${selectedPath.home ? style.selected : ""}`}
          onClick={() => navigate("/")}
          data-tooltip-id="home"
          data-tooltip-content="Home"
        />
        <Tooltip id="home" />

        <Heart
          className={`${style.icon} ${
            selectedPath.favorites ? style.selected : ""
          }`}
          onClick={() => navigate("/favorites")}
          data-tooltip-id="favorites"
          data-tooltip-content="Favoritos"
        />
        <Tooltip id="favorites" style={{userSelect: 'none'}}/>

      </div>
      <div className={style.Container2}>
        <input type="text" className={style.input} />
        <Search className={style.icon} />
      </div>

      <div className={style.Container3}>
        <Profile className={style.icon} />
      </div>
    </div>
  );
};

export default NavBar;
