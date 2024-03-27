import { createPortal } from "react-dom";
import style from "./disaproveModal.module.scss";

interface Props {
  confirm: () => void;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  
}

const DisapproveModal = ({ confirm, setModalOpen }: Props) => {
  const rootElement = document.getElementById("root") as Element;

  return createPortal(
    <div className={style.Container}>
      <div className={style.modal}>
        <h3>¿Desaprobar Perro?</h3>

        <div>
          <button onClick={confirm}>Si</button>
          <button onClick={() => setModalOpen(false)}>No</button>
        </div>
      </div>
    </div>,
    rootElement,
  );
};

export default DisapproveModal;
