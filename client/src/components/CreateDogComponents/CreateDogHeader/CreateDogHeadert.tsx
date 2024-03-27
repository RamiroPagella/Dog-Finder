import { useAppContext } from "../../../hooks/contextHooks";
import style from "./createDog.module.scss";

interface Props {
  restoreDog: () => void;
  sendDog: () => void;
  cancelModify: () => void;
  modifyDog: () => void;
}

const CreateDogHeader = ({ restoreDog, sendDog, cancelModify, modifyDog }: Props) => {
  const { modifying } = useAppContext();

  return (
    <div className={style.createDogHeader}>
      <h1>
        Crear Perro
        {modifying && " (Modificando)"}
      </h1>

      {!modifying ? (
        <section className={style.buttons}>
          <button onClick={sendDog}>Crear</button>
          <button onClick={restoreDog}>Restablecer</button>
        </section>
      ) : (
        <section className={style.buttons}>
          <button onClick={cancelModify}>Cancelar</button>
          <button onClick={modifyDog}>Confirmar</button>
          <button onClick={restoreDog}>Restablecer</button>
        </section>
      )}
    </div>
  );
};

export default CreateDogHeader;
