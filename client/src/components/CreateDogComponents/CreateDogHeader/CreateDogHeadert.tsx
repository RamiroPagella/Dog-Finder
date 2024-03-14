import style from "./createDog.module.scss";

interface Props {
  restoreDog: () => void;
  sendDog: () => void;
}

const CreateDogHeader = ({ restoreDog, sendDog }: Props) => {
  return (
    <div className={style.createDogHeader}>
      <h1>Crear Perro</h1>

      <div className={style.buttons}>
        <button onClick={sendDog}>Crear</button>
        <button onClick={restoreDog}>Restablecer</button>
      </div>
    </div>
  );
};

export default CreateDogHeader;
