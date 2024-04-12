import { useLocation, useNavigate } from "react-router-dom";
import {
  CloseButton,
  DogHouse,
  DogPaw,
  Heart,
  Profile,
} from "../../assets/icons";
import style from "./navBarModal.module.scss";
import { useState } from "react";

interface Props {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavBarModal = ({ setOpenModal }: Props) => {
  const { pathname } = useLocation();
  const [closingModal, setClosingModal] = useState<boolean>(false);
  const navigate = useNavigate();

  const closeModal = () => {
    setClosingModal(true);
    setTimeout(() => {
      setOpenModal(false);
    }, 300);
  };

  const handleClick = (string: string) => {
    navigate(string);
    closeModal();
  };

  return (
    <div
      className={`${style.Container} ${closingModal ? style.Container_closing : ""}`}
    >
      <div className={style.NavBarModal}>
        <CloseButton onClick={closeModal} />
        <section
          className={pathname === "/create-dog" ? style.selectedSection : ""}
          onClick={() => handleClick("/create-dog")}
        >
          <DogPaw />
          <p>Crear Perro</p>
        </section>
        <section
          className={pathname === "/" ? style.selectedSection : ""}
          onClick={() => handleClick("/")}
        >
          <DogHouse />
          <p>Explorar</p>
        </section>
        <section
          className={pathname === "/favorites" ? style.selectedSection : ""}
          onClick={() => handleClick("/favorites")}
        >
          <Heart />
          <p>Favoritos</p>
        </section>
        <section
          className={pathname === "/profile" ? style.selectedSection : ""}
          onClick={() => handleClick("/profile")}
        >
          <Profile />
          <p>Mi cuenta</p>
        </section>
      </div>
    </div>
  );
};

export default NavBarModal;
