import style from "./navBar.module.scss";
import { Profile, Heart, DogHouse, DogPaw, Menu } from "../../assets/icons";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUserContext } from "../../hooks/contextHooks";
import SearchBar from "../SearchBar/SearchBar";
import NavBarModal from "../NavBarModal/NavBarModal";

interface target extends EventTarget {
  id?: string;
}

const NavBar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { isAuthenticated } = useUserContext();
  const [responsive, setResponsive] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const responsiveWidth = 650;

  const [showTooltip, setShowTooltip] = useState({
    createDog: false,
    explore: false,
    favorites: false,
    profile: false,
  });
  const selectedPath = {
    createDog: pathname === "/create-dog",
    explore: pathname === "/",
    favorites: pathname === "/favorites",
    profile: pathname.includes("/profile"),
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const target: target = e.target;

    if (!target.id) return;

    setShowTooltip({ ...showTooltip, [target.id]: true });
  };
  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const target: target = e.target;

    if (!target.id) return;

    setShowTooltip({ ...showTooltip, [target.id]: false });
  };

  useEffect(() => {
    const handleResize = () => {
      window.innerWidth <= responsiveWidth
        ? setResponsive(true)
        : setResponsive(false);
    };
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={style.NavBar}>
      <div className={style.Container1}>
        {responsive ? (
          <Menu onClick={() => setOpenModal(true)} className={style.menuIcon} />
        ) : (
          <>
            <div
              className={style.iconContainer}
              id="createDog"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={() => navigate("/create-dog")}
            >
              <DogPaw
                className={`${style.icon} ${
                  selectedPath.createDog ? style.icon_on : ""
                }`}
              />
              {showTooltip.createDog && <p>Crear perro</p>}
            </div>

            <div
              className={style.iconContainer}
              id="explore"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={() => navigate("/")}
            >
              <DogHouse
                className={`${style.icon} ${selectedPath.explore ? style.icon_on : ""}`}
              />
              {showTooltip.explore && <p>Explorar</p>}
            </div>

            <div
              className={style.iconContainer}
              id="favorites"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={() => navigate("/favorites")}
            >
              <Heart
                className={`${style.icon} ${
                  selectedPath.favorites ? style.icon_on : ""
                }`}
              />
              {showTooltip.favorites && <p>Favoritos</p>}
            </div>
          </>
        )}
      </div>

      <div className={style.Container2}>
        {(pathname === "/" ||
          pathname === "/favorites" ||
          pathname === "/profile/pending-dogs") && <SearchBar />}
      </div>

      <div className={style.Container3}>
        {isAuthenticated ? (
          <NavLink to={"/profile"} className={style.iconContainer}>
            <Profile
              className={`${style.icon} ${selectedPath.profile ? style.icon_on : ""}`}
            />
          </NavLink>
        ) : (
          <NavLink to="/login" className={style.button}>
            Iniciar sesión
          </NavLink>
        )}
      </div>

      {openModal && <NavBarModal setOpenModal={setOpenModal} />}
    </div>
  );
};

export default NavBar;
