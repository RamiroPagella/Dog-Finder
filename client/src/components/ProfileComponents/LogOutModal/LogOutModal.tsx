import style from "./logOutModal.module.scss";
import { createPortal } from "react-dom";

interface Props {
  setOpenLogOutModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const LogOutModal = ({ setOpenLogOutModal }: Props) => {
  const body = document.querySelector("body") as Element;

  return createPortal(
    <div className={style.LogOutModalContainer}>
      <section className={style.modal}>
        <h3>¿Cerrar sesión?</h3>

        <div>
          <button
            onClick={() => {
              localStorage.removeItem("jwtToken");
              window.location.href = "/";
            }}
          >
            Si
          </button>

          <button
            onClick={() => {
              setOpenLogOutModal(false);
            }}
          >
            No
          </button>
        </div>
      </section>
    </div>,
    body,
  );
};

export default LogOutModal;
